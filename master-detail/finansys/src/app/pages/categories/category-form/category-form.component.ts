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

    private setCurrentAction():void {
        if(this.route.snapshot.url[0].path == "new")
            this.currentAction = "new"
        else
            this.currentAction = "edit"
    }
    
    private buildCategoryForm():void {
        this.categoryForm = this.formBuilder.group({
            id: [null],
            name: [null, Validators.required, Validators.minLength(2)],
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
                err => {
                    toastr.error("Ocorreu um erro no servidor, tente mais tarde");
                    console.log(err);
                }
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

}
