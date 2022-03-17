import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CadastroPfComponent } from './components/cadastro-pf.component';
import { CadastrarPfComponent } from './components/cadastrar-pf/cadastrar-pf.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadastrarPfService } from './services/cadastrar-pf.service';

@NgModule({
    declarations: [
        CadastrarPfComponent,
        CadastroPfComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatTooltipModule,
        MatIconModule,
        MatSnackBarModule,
        SharedModule
    ],
    providers: [
        CadastrarPfService
    ]
})
export class CadastroPfModule { }
