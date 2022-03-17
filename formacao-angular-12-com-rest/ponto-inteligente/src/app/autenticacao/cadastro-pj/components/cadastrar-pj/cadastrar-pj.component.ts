import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CnpjValidator } from 'src/app/shared/validators/cnpj.validator';
import { CpfValidator } from 'src/app/shared/validators/cpf.validator';
import { CadastroPj } from '../../models/cadastro-pj.model';

@Component({
    selector: 'app-cadastrar-pj',
    templateUrl: './cadastrar-pj.component.html',
    styleUrls: ['./cadastrar-pj.component.css']
})
export class CadastrarPjComponent implements OnInit {

    form: FormGroup;

    constructor(
        private fb: FormBuilder, 
  	    private snackBar: MatSnackBar,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.gerarForm();
    }

    gerarForm() {
        this.form = this.fb.group({
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
        alert(`
            nome: ${cadastroPj.nome}, 
            email: ${cadastroPj.email}, 
            senha: ${cadastroPj.senha}, 
            cpf: ${cadastroPj.cpf}, 
            razaoSocial: ${cadastroPj.razaoSocial}, 
            cnpj: ${cadastroPj.cnpj} 
        `);
    }

}
