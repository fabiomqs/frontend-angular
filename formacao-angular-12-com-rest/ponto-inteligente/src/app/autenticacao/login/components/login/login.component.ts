import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from '../../models/login.model';

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
            this.snackBar.open(
                "Dados inválidos", "Erro", { duration: 5000 });
            return;
        }
        const login:Login = this.form.value;
        this.snackBar.open(
            `Email: ${login.email}, Senha: ${login.senha}`, "Logado", { duration: 5000 });
            //JSON.stringify(login), "Logado", { duration: 5000 });
        //alert(JSON.stringify(login));
    }

}
