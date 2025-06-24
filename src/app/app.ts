import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ElementService } from './element.service';
import { ElementSearchStore } from './elements-search.store';
import { ElementsTable } from "./elements-table/elements-table";
import { Store } from '@ngrx/store';
import { selectElements } from './state/elements.selectors';
import { ElementsApiActions } from './state/elements.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,
    MatSlideToggleModule, MatToolbarModule, MatInputModule,
    MatIconModule, MatTableModule, ElementsTable],
  providers: [ElementSearchStore],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'periodic-table';

  displayedColumns: String[] = ["position"];
  dataSource: {position: number}[] = [{ position: 1 }, {position: 2}]
  
  elementService: ElementService = inject(ElementService);
  readonly elementStore = inject(ElementSearchStore);

  elements$;
  constructor(
    private store: Store
  ) {
    this.elements$ = this.store.select( selectElements )
  }

  ngOnInit(): void {
    this.elementService
      .getElements()
      .subscribe( (elements) =>
        this.store.dispatch( ElementsApiActions.retrievedElementsList({ elements }) )
      );
  }
}
