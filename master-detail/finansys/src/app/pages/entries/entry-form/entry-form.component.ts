import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import * as toastr from "toastr";
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';




@Component({
    selector: 'app-entry-form',
    templateUrl: './entry-form.component.html',
    styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

    currentAction: string;
    entryForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;
    entry: Entry = new Entry();
    categories: Array<Category>;

    imaskConfig = {
        mask: Number,
        scale: 2,
        thousandsSeparator: '',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: ','
    };
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private entryService: EntryService,
        private categoryService: CategoryService,
        private formBuilder: FormBuilder,
        
    ) { }

    

    ngOnInit(): void {
        
        this.setCurrentAction();
        this.buildEntryForm();
        this.loadEntry();
        this.loadCategories();

    }

    

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    submitForm(): void {
        this.submittingForm = true;
        if (this.currentAction == "new")
            this.createEntry();
        else
            this.updateEntry();
    }

    get typeOptions(): Array<any> {
        return Object.entries(Entry.types)
            .map(
                ([value, text]) => {
                    return {
                        text: text,
                        value: value
                    }
                }
            )
    }

    private createEntry(): void {
        const entry: Entry =
            Object.assign(new Entry(), this.entryForm.value);

        this.entryService.create(entry)
            .subscribe(
                entry => this.actionsForSuccess(entry),
                err => this.actionsForError(err)
            )
    }

    private actionsForSuccess(entry: Entry): void {
        let message = "Entry " + entry.name + " ";
        if (this.currentAction == "new")
            message += "criada com sucesso!"
        else
            message += "atualizada com sucesso!"
        toastr.success(message);

        this.router.navigateByUrl("entries", { skipLocationChange: true })
            .then(
                () => this.router.navigate(["entries", entry.id, "edit"])
            )
    }

    private updateEntry(): void {
        const entry: Entry =
            Object.assign(new Entry(), this.entryForm.value);

        this.entryService.update(entry)
            .subscribe(
                entry => this.actionsForSuccess(entry),
                err => this.actionsForError(err)
            )
    }

    private setCurrentAction(): void {
        if (this.route.snapshot.url[0].path == "new")
            this.currentAction = "new"
        else
            this.currentAction = "edit"
    }

    private buildEntryForm(): void {
        this.entryForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required, Validators.minLength(2)]],
            description: [null],
            type: ["expense", [Validators.required]],
            amount: [null, [Validators.required]],
            date: [null, [Validators.required]],
            paid: [true, [Validators.required]],
            categoryId: [null, [Validators.required]]
        });
    }

    private loadEntry(): void {
        if (this.currentAction == "edit") {
            this.route.paramMap.pipe(
                switchMap(params => this.entryService.getById(+params.get("id")))
            ).subscribe(
                entry => {
                    this.entry = entry;
                    this.entryForm.patchValue(this.entry);
                },
                err => this.actionsForError(err)
            )

        }
    }

    private loadCategories() {
        this.categoryService.getAll()
            .subscribe(
                categories => this.categories = categories
            );
    }


    private setPageTitle(): void {
        if (this.currentAction == "new")
            this.pageTitle = "Cadastro de Novo Lançamento";
        else {
            const entryName = this.entry.name || "";
            this.pageTitle = "Editando Lançamento: " + entryName;
        }
    }

    private actionsForError(err): void {
        toastr.error("Ocorreu um erro no servidor, tente mais tarde");
        console.log(err);
        this.submittingForm = false;
        if (err.status === 422)
            this.serverErrorMessages = JSON.parse(err._body).errors;
        else
            this.serverErrorMessages = ["Erro no servidor, tente mais tarde."]
    }

}
