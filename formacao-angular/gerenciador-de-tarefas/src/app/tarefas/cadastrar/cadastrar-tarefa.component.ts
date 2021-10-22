import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarefa } from '../shared/tarefa.model';
import { TarefaService } from '../shared/tarefa.service';

@Component({
    selector: 'app-cadastrar-tarefa',
    templateUrl: './cadastrar-tarefa.component.html',
    styleUrls: ['./cadastrar-tarefa.component.css']
})
export class CadastrarTarefaComponent implements OnInit {

    @ViewChild('formTarefa', { static: true }) formTarefa: NgForm;
    tarefa: Tarefa;

    constructor(
        private router: Router,
        private tarefaService: TarefaService
    ) { }

    ngOnInit(): void {
        this.tarefa = new Tarefa(0, "", false);
    }

    cadastrar(): void {
        if (this.formTarefa.form.valid) {
            this.tarefaService.cadastrar(this.tarefa);
            this.router.navigate(["/tarefas"]);
        }
    }

}
