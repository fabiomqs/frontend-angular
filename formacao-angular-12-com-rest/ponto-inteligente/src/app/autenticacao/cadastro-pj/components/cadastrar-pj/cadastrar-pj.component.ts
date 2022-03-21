import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CnpjValidator } from 'src/app/shared/validators/cnpj.validator';
import { CpfValidator } from 'src/app/shared/validators/cpf.validator';
import { CadastroPj } from '../../models/cadastro-pj.model';
import { CadastroPjService } from '../../services/cadastro-pj.service';

@Component({
    selector: 'app-cadastrar-pj',
    templateUrl: './cadastrar-pj.component.html',
    styleUrls: ['./cadastrar-pj.component.css']
})
export class CadastrarPjComponent implements OnInit {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder, 
  	    private snackBar: MatSnackBar,
          private cadastroPjService: CadastroPjService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.gerarForm();
    }

    gerarForm() {
        this.form = this.formBuilder.group({
            nome: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required, Validators.minLength(6)]],
            cpf: ['', [Validators.required, CpfValidator]],
            razaoSocial: ['', [Validators.required, Validators.minLength(5)]],
            cnpj: ['', [Validators.required, CnpjValidator]]
        });
    }
  
    cadastrarPj() {
        if (this.form.invalid) {
            return;
        }
        const cadastroPj: CadastroPj = this.form.value;
            this.cadastroPjService.cadastrar(cadastroPj)
            .subscribe({
                next: (data) => {
                    console.log(JSON.stringify(data));
                    const msg: string = "Realize o login para acessar o sistema.";
                    this.snackBar.open(msg, "Sucesso", { duration: 5000 });
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    console.log(JSON.stringify(err));
                    let msg: string = "Tente novamente em instantes.";
                    if (err.status == 400) {
                    msg = err.error.errors.join(' ');
                    }
                    this.snackBar.open(msg, "Erro", { duration: 5000 });
                }
            });
    }

}
