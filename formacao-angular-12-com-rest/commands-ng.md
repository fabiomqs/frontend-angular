Formação Angular 13 - Integração com API Restful JavaSpring
to run api:
>	.\mvnw.cmd spring-boot:run

>	ng new ponto-inteligente
>	ng serve 
>	ng add @angular/material
>	npm i @angular/flex-layout hammerjs

// module login
>	ng g m autenticacao/login
// component login
>	ng g c autenticacao/login/components/login --skip-tests
// main routing module
>	ng g class app-routing.module --skip-tests
// login routing module
>	ng g class autenticacao/login/login-routing.module --skip-tests
>	ng g class autenticacao/login/components/logar.component --skip-tests
>	ng g s autenticacao/login/services/login --skip-tests
>	ng g m autenticacao/cadastro-pj
>	ng g c autenticacao/cadastro-pj/components/cadastrar-pj --skip-tests
>	ng g m shared
>	ng g directive shared/directives/mascara --selector mascara 
>	ng g s autenticacao/cadastro-pj/services/cadastro-pj --skip-tests

>	ng g m autenticacao/cadastro-pf
>	ng g c autenticacao/cadastro-pf/components/cadastrar-pf --skip-tests
>	ng g s autenticacao/cadastro-pf/services/cadastrar-pf --skip-tests

>	ng g m funcionario
>	ng g c funcionario/components/listagem --skip-tests
>	ng g c funcionario/components/lancamento --skip-tests

>	npm install moment --save

>	ng g s shared/services/http-util --skip-tests
>	ng g s shared/services/lancamento --skip-tests

>	ng g pipe shared/pipes/tipo --skip-tests
>	ng g pipe shared/pipes/data --skip-tests

>	ng g m admin
>	ng g c admin/components/listagem --skip-tests
>	ng g c admin/components/cadastro --skip-tests
>	ng g c admin/components/atualizacao --skip-tests

>	ng g s shared/services/funcionario --skip-tests

>	ng g guard admin/services/admin --skip-tests