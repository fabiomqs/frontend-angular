import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as moment from 'moment';

import { Tipo } from 'src/app/shared/models/tipo.enum';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';
import { Lancamento } from 'src/app/shared/models/lancamento.model';

declare var navigator: any;

@Component({
    selector: 'app-lancamento',
    templateUrl: './lancamento.component.html',
    styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

    private dataAtualEn: string;
    dataAtual: string;
    geoLocation: string;
    ultimoTipoLancado: string;

    constructor(
        private snackBar: MatSnackBar,
        private router: Router,
        private httpUtil: HttpUtilService,
        private lancamentoService: LancamentoService
    ) { }

    ngOnInit(): void {
        this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
        this.dataAtualEn = moment().format('YYYY-MM-DD HH:mm:ss');
        this.obterGeoLocation();
        this.ultimoTipoLancado = '';
        this.obterUltimoLancamento();
    }

    obterGeoLocation(): string {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position =>
                this.geoLocation = `${position.coords.latitude},${position.coords.longitude}`);
        }
        return '';
    }

    iniciarTrabalho() {
        this.cadastrar(Tipo.INICIO_TRABALHO);
    }

    terminarTrabalho() {
        this.cadastrar(Tipo.TERMINO_TRABALHO);
    }

    iniciarAlmoco() {
        this.cadastrar(Tipo.INICIO_ALMOCO);
    }

    terminarAlmoco() {
        this.cadastrar(Tipo.TERMINO_ALMOCO);
    }

    obterUltimoLancamento() {
        this.lancamentoService.buscarUltimoTipoLancado()
            .subscribe({
                next: (data) => {
                    this.ultimoTipoLancado = data.data ? data.data.tipo : '';
                },
                error: (err) => {
                    const msg: string = "Erro obtendo último lançamento.";
                    this.snackBar.open(msg, "Erro", { duration: 5000 });
                }
            });
    }

    cadastrar(tipo: Tipo) {
        const lancamento: Lancamento = new Lancamento(
            this.dataAtualEn,
            tipo,
            this.geoLocation,
            this.httpUtil.obterIdUsuario()
        );

        this.lancamentoService.cadastrar(lancamento)
            .subscribe({
                next: (data) => {
                    const msg: string = "Lançamento realizado com sucesso!";
                    this.snackBar.open(msg, "Sucesso", { duration: 5000 });
                    this.router.navigate(['/funcionario/listagem']);
                },
                error: (err) => {
                    let msg: string = "Tente novamente em instantes.";
                    if (err.status == 400) {
                        msg = err.error.errors.join(' ');
                    }
                    this.snackBar.open(msg, "Erro", { duration: 5000 });
                }
            });
    }
    
    obterUrlMapa(): string {
        return "https://www.google.com/maps/search/?api=1&query=" +
            this.geoLocation;
    }

    exibirInicioTrabalho(): boolean {
        return this.ultimoTipoLancado == '' ||
            this.ultimoTipoLancado == Tipo.TERMINO_TRABALHO;
    }

    exibirTerminoTrabalho(): boolean {
        return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO ||
            this.ultimoTipoLancado == Tipo.TERMINO_ALMOCO;
    }

    exibirInicioAlmoco(): boolean {
        return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO;
    }

    exibirTerminoAlmoco(): boolean {
        return this.ultimoTipoLancado == Tipo.INICIO_ALMOCO;
    }

}
