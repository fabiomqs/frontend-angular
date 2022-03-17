import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './components/listagem/listagem.component';
import { LancamentoComponent } from './components/lancamento/lancamento.component';
import { FuncionarioComponent } from './components/funcionario.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
    declarations: [
        ListagemComponent,
        LancamentoComponent,
        FuncionarioComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule
    ]
})
export class FuncionarioModule { }
