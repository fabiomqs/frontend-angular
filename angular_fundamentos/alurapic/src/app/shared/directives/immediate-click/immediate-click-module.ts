import {NgModule} from "@angular/core";
import { immediateClickDirective } from "./immediate-click.directive";
import { CommonModule }  from "@angular/common";

@NgModule({
    declarations: [
        immediateClickDirective
    ],
    exports: [
        immediateClickDirective
    ],
    imports: [
        CommonModule
    ]
})
export class ImmediateClickModule { }