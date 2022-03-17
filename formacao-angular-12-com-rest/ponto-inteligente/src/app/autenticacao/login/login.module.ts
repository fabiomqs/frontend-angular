import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginComponent } from './components/login/login.component';
import { LogarComponent } from './components/logar.component';
import { LoginService } from './services/login.service';

@NgModule({
    declarations: [
        LoginComponent,
        LogarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlexLayoutModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatTooltipModule,
        MatIconModule,
        MatSnackBarModule
    ],
    providers: [
        LoginService
    ]
})
export class LoginModule { }
