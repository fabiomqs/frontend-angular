import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    categories: Category[] = [];

    constructor(
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.getAllCategories();
    }

    private getAllCategories(): void {
        this.categoryService.getAll()
                .subscribe(
                    categories => {
                        this.categories = categories
                    },
                    err => console.log(err)
                );
    }

    deleteCategory(category: Category) {
        const mustDelete = 
            confirm(`Deseja realmente excluir a categoria ${category.name}?`);
        if(mustDelete) {
            this.categoryService
                    .delete(category.id as number)
                    .subscribe(
                        () => {this.getAllCategories();},
                        err => console.log(err)
                    );
        }
    }

}
