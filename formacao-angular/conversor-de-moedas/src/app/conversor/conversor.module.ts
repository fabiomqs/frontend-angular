import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversorComponent } from './components/conversor.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NumeroDirective } from './directives/numero.directive';
import { ModalCotacaoComponent } from './utils/modal-cotacao.component';
import { DataBrPipe } from './pipes/data-br.pipe';

@NgModule({
    declarations: [
        ConversorComponent,
        NumeroDirective,
        ModalCotacaoComponent,
        DataBrPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [
        ConversorComponent
    ]
})
export class ConversorModule { }
