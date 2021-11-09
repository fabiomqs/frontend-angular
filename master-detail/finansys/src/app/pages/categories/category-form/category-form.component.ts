import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import * as toastr from "toastr";
import { Category } from '../shared/category.model';


import { CategoryService } from '../shared/category.service';



@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

    currentAction: string;
    categoryForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;
    category: Category = new Category();

    constructor(
        private route:ActivatedRoute,
        private router: Router,
        private categoryService:CategoryService,
        private formBuilder: FormBuilder
    ) { }
    
    ngOnInit(): void {
        this.setCurrentAction();
        this.buildCategoryForm();
        this.loadCategory();
    }
    
    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    submitForm():void {
        this.submittingForm = true;
        if(this.currentAction == "new")
            this.createCategory();
        else 
            this.updateCategory();
    }

    private createCategory():void {
        const category: Category = 
            Object.assign(new Category(), this.categoryForm.value);
        
        this.categoryService.create(category)
            .subscribe(
                category => this.actionsForSuccess(category),
                err => this.actionsForError(err)
            )
    }

    private actionsForSuccess(category: Category): void {
        let message = "Categoria " + category.name + " ";
        if(this.currentAction == "new")
            message +=  "criada com sucesso!"
        else 
            message +=  "atualizada com sucesso!"
        toastr.success(message);

        this.router.navigateByUrl("categories", {skipLocationChange: true})
            .then(
                () => this.router.navigate(["categories", category.id, "edit"])
            )
    }
    
    private updateCategory():void {
        const category: Category = 
            Object.assign(new Category(), this.categoryForm.value);
        
        this.categoryService.update(category)
            .subscribe(
                category => this.actionsForSuccess(category),
                err => this.actionsForError(err)
            )
    }

    private setCurrentAction():void {
        if(this.route.snapshot.url[0].path == "new")
            this.currentAction = "new"
        else
            this.currentAction = "edit"
    }
    
    private buildCategoryForm():void {
        this.categoryForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required, Validators.minLength(2)]],
            description: [null]
        });
    }
    
    private loadCategory():void {
        if(this.currentAction == "edit") {
            this.route.paramMap.pipe(
                switchMap(params => this.categoryService.getById(+params.get("id")))
            ).subscribe(
                category => {
                    this.category = category;
                    this.categoryForm.patchValue(this.category);
                },
                err => this.actionsForError(err)
            )
            
        }
    }


    private setPageTitle():void {
        if(this.currentAction == "new")
            this.pageTitle = "Cadastro de Nova Categoria";
        else {
            const categoryName = this.category.name || "";
            this.pageTitle = "Editando Categoria: " + categoryName;
        }
    }

    private actionsForError(err): void {
        toastr.error("Ocorreu um erro no servidor, tente mais tarde");
        console.log(err);
        this.submittingForm = false;
        if(err.status === 422)
            this.serverErrorMessages = JSON.parse(err._body).errors;
        else 
            this.serverErrorMessages = ["Erro no servidor, tente mais tarde."]
    }

}
