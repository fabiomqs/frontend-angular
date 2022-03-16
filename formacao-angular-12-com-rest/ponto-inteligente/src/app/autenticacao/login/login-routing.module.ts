import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogarComponent } from "./components/logar.component";
import { LoginComponent } from "./components/login/login.component";

export const loginRoutes:Routes = [
    { 
        path: 'login', 
        component: LogarComponent,
        children: [
            {path: '', component: LoginComponent}
        ]
    }
]

@NgModule({
    imports: [ RouterModule.forChild(loginRoutes)],
    exports: [ RouterModule ]
})
export class LoginRoutingModule { }
