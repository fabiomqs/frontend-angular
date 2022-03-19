import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Lancamento } from 'src/app/shared/models/lancamento.model';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';

@Component({
    selector: 'app-listagem',
    templateUrl: './listagem.component.html',
    styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

    dataSource: MatTableDataSource<Lancamento>;
    colunas: string[] = ['data', 'tipo', 'localizacao'];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private lancamentoService: LancamentoService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.lancamentoService.listarTodosLancamentos()
            .subscribe({
                next: (data) => {
                    const lancamentos = data['data'] as Lancamento[];
                    this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                },
                error: (err) => {
                    const msg: string = "Erro obtendo lançamentos.";
                    this.snackBar.open(msg, "Erro", { duration: 5000 });
                }
            });
    }

}
