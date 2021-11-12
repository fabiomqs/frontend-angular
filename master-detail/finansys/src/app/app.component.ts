import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'Finansys';

    constructor(
        private config: PrimeNGConfig, 
        private translateService: TranslateService
    ) {}

    ngOnInit(): void {
        this.translateService.setTranslation('pt-br', {
            "primeng": {
                "firstDayOfWeek": 0,
                "dayNames": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
                "dayNamesShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                "dayNamesMin": ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"],
                "monthNames": [
                    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
                    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
                ],
                "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                "today": "Hoje",
                "clear": "Limpar",
                "dateFormat": "dd/mm/yy",
                "weekHeader": "Wk"
            }
        });
        this.translateService.setDefaultLang('pt-br');
        //this.translateService.use('pt-br');
        this.translate('pt-br');
    }

    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService.get('primeng')
            .subscribe(res => this.config.setTranslation(res));
    }
}
