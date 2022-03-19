import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
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

    funcionarios: Funcionario[];
    @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
    form: FormGroup;

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
        this.obterFuncionarios();
        this.gerarForm();
    }

    gerarForm() {
        this.form = this.formBuilder.group({
            funcs: ['', []]
        });
    }

    ordemPadrao() {
        this.ordem = 'data';
        this.direcao = 'DESC';
    }

    get funcId(): string {
        return sessionStorage['funcionarioId'] || false;
    }

    obterFuncionarios() {
        this.funcionarioService.listarFuncionariosPorEmpresa()
            .subscribe({
                next: (data) => {
                    const usuarioId: string = this.httpUtil.obterIdUsuario();
                    this.funcionarios = (data.data as Funcionario[])
                        .filter(func => func.id != usuarioId);

                    if (this.funcId) {
                        this.form.get('funcs').setValue(parseInt(this.funcId, 10));
                        this.exibirLancamentos();
                    }
                },
                error: (err) => {
                    const msg: string = "Erro obtendo funcionários.";
                    this.snackBar.open(msg, "Erro", { duration: 5000 });
                }
            });
    }


    exibirLancamentos() {
        if (this.matSelect.selected) {
            this.funcionarioId = this.matSelect.selected['value'];
        } else if (this.funcId) {
            this.funcionarioId = this.funcId;
        } else {
            return;
        }
        sessionStorage['funcionarioId'] = this.funcionarioId;

        this.lancamentoService.listarLancamentosPorFuncionario(
            this.funcionarioId, this.pagina, this.ordem, this.direcao)
            .subscribe({
                next: (data) => {
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
