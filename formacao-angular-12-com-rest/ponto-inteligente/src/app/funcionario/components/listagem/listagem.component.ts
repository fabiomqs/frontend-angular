import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
                },
                error: (err) => {
                    const msg: string = "Erro obtendo lançamentos.";
                    this.snackBar.open(msg, "Erro", { duration: 5000 });
                }
            });
    }

}
