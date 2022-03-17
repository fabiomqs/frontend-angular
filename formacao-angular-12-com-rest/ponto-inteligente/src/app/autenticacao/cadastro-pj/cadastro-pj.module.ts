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

import { CadastrarPjComponent } from './components/cadastrar-pj/cadastrar-pj.component';
import { CadastroPjComponent } from './components/cadastro-pj.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadastroPjService } from './services/cadastro-pj.service';

@NgModule({
    declarations: [
        CadastrarPjComponent,
        CadastroPjComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
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
        CadastroPjService
    ]
})
export class CadastroPjModule { }
