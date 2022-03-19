import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Lancamento } from 'src/app/shared/models/lancamento.model';
import { FuncionarioService } from 'src/app/shared/services/funcionario.service';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';

@Component({
    selector: 'app-listagem',
    templateUrl: './listagem.component.html',
    styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

    dataSource: MatTableDataSource<Lancamento>;
    colunas: string[] = ['data', 'tipo', 'localizacao', 'acao'];
    funcionarioId: string;
    totalLancamentos: number;

    private pagina: number;
    private ordem: string;
    private direcao: string;

    constructor(
        private lancamentoService: LancamentoService,
        private funcionarioService: FuncionarioService,
        private httpUtil: HttpUtilService,
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.pagina = 0;
        this.ordemPadrao();
        this.exibirLancamentos();
    }

    ordemPadrao() {
        this.ordem = 'data';
        this.direcao = 'DESC';
    }

    exibirLancamentos() {
        this.funcionarioId = '3';
        this.lancamentoService.listarLancamentosPorFuncionario(
            this.funcionarioId, this.pagina, this.ordem, this.direcao)
            .subscribe({
                next: (data) => {
                    console.log(data)
                    this.totalLancamentos = data['data'].totalElements;
                    const lancamentos = data['data'].content as Lancamento[];
                    this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
                },
                error: (err) => {
                    const msg: string = "Erro obtendo lançamentos.";
                    this.snackBar.open(msg, "Erro", { duration: 5000 });
                }
            });
    }

    remover(lancamentoId: string) {
        alert(lancamentoId);
    }

    paginar(pageEvent: PageEvent) {
        this.pagina = pageEvent.pageIndex;
        this.exibirLancamentos();
    }

    ordenar(sort: Sort) {
        if (sort.direction == '') {
            this.ordemPadrao();
        } else {
            this.ordem = sort.active;
            this.direcao = sort.direction.toUpperCase();
        }
        this.exibirLancamentos();
    }

}
