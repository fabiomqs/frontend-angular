import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmarDialog, ListagemComponent } from './components/listagem/listagem.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AtualizacaoComponent } from './components/atualizacao/atualizacao.component';
import { SharedModule } from '../shared/shared.module';
import { LancamentoService } from '../shared/services/lancamento.service';
import { HttpUtilService } from '../shared/services/http-util.service';
import { PtBrMatPaginatorIntl } from '../shared/pt-br-mat-paginator-intl';
import { AdminComponent } from './components/admin.component';
import { FuncionarioService } from '../shared/services/funcionario.service';
import { AdminGuard } from './services/admin.guard';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatTooltipModule,
        MatIconModule,
        MatSnackBarModule,
        MatTableModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        SharedModule
    ],
    declarations: [
        ListagemComponent,
        CadastroComponent,
        AtualizacaoComponent,
        AdminComponent,
        ConfirmarDialog
    ],
    providers: [
        LancamentoService,
        HttpUtilService,
        FuncionarioService,
        MatPaginatorIntl,
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl },
        AdminGuard
    ]
    
    //,
    //entryComponents no longer required
    //entryComponents: [
    //    ConfirmarDialog
    //]
})
export class AdminModule { }
