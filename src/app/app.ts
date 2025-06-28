import { Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ElementsTable } from "./elements-table/elements-table";
import { ElementsStore } from './elements-table/elements.store';
import { debounceTime, merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ElementService } from './elements-table/element.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule, ReactiveFormsModule,
    ElementsTable,
    MatToolbarModule, MatInputModule, MatIconModule, MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  elementService = inject( ElementService );
  readonly elementStore = inject( ElementsStore );
  readonly searchInput = new FormControl( "" );

  constructor() {
    merge( this.searchInput.statusChanges, this.searchInput.valueChanges )
      .pipe( takeUntilDestroyed(), debounceTime( 2000 ) )
      .subscribe( () => {
        this.elementStore.updateQuery( this.searchInput.value || "" );
      } )
  }
}
