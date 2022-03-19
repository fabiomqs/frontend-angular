import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListagemComponent } from './components/listagem/listagem.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AtualizacaoComponent } from './components/atualizacao/atualizacao.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponent } from './components/admin.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        ListagemComponent,
        CadastroComponent,
        AtualizacaoComponent,
        AdminComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule
    ]
})
export class AdminModule { }
