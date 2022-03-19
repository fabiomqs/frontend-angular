import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives/mascara.directive';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';

@NgModule({
    declarations: [
        MascaraDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MascaraDirective
    ],
    providers: [
        PtBrMatPaginatorIntl
    ]
})
export class SharedModule { }
