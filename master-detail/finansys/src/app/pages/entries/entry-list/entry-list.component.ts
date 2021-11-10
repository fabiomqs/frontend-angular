import { Component, OnInit } from '@angular/core';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
    selector: 'app-entry-list',
    templateUrl: './entry-list.component.html',
    styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

    entries: Entry[] = [];

    constructor(
        private entryService: EntryService
    ) { }

    ngOnInit(): void {
        this.getAllEntries();
    }

    private getAllEntries(): void {
        this.entryService.getAll()
                .subscribe(
                    entries => {
                        this.entries = [];
                        entries.forEach(
                            entry => {
                                let newEntry = Object.assign(new Entry(), entry);
                                this.entries.push(newEntry);
                            }
                        )
                    },
                    err => console.log(err)
                );
    }

    deleteEntry(entry: Entry) {
        const mustDelete = 
            confirm(`Deseja realmente excluir o lançamento ${entry.name}?`);
        if(mustDelete) {
            this.entryService
                    .delete(entry.id as number)
                    .subscribe(
                        () => {
                            this.getAllEntries();
                        },
                        err => console.log(err)
                    );
        }
    }

}
