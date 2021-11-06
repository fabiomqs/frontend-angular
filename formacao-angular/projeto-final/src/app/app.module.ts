import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { CalculadoraModule } from './calculadora';
import { ConversorModule } from './conversor/conversor.module';
import { TarefasModule } from './tarefas/tarefas.module';
import { JogoDaVelhaModule } from './jogo-da-velha/jogo-da-velha.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        DashboardModule,
        CalculadoraModule,
        ConversorModule,
        TarefasModule,
        JogoDaVelhaModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
