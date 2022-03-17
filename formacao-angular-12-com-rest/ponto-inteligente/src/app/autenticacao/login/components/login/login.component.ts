import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from '../../models/login.model';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder, 
        private snackBar: MatSnackBar,
        private loginService:LoginService,
        private router:Router
    ) { }

    ngOnInit(): void {
        this.gerarForm();
    }

    gerarForm() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    logar() {
        if (this.form.invalid) {
            return;
        }
    
        const login: Login = this.form.value;
        this.loginService.logar(login)
            .subscribe({
                next: (data) => {
                    localStorage['token'] = data['data']['token'];
                    const usuarioData = JSON.parse(
                        atob(data['data']['token'].split('.')[1]));
                    if (usuarioData['role'] == 'ROLE_ADMIN') {
                        this.router.navigate(['/admin']);
                    } else {
                        this.router.navigate(['/funcionario']);
                    }
                },
                error: (err) => {
                    let msg: string = "Tente novamente em instantes.";
                    if (err['status'] == 401) {
                        msg = "Email/senha inválido(s)."
                    }
                    this.snackBar.open(msg, "Erro", { duration: 5000 });
                } 
            });
         
    }

}
