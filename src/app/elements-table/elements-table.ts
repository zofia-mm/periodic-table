import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ElementsStore } from './elements.store';

@Component({
  selector: 'app-elements-table',
  imports: [ MatTableModule ],
  templateUrl: './elements-table.html',
  styleUrl: './elements-table.css'
})
export class ElementsTable {
  displayedColumns: String[] = ["position", "name", "weight", "symbol"];
  readonly elementsStore = inject( ElementsStore );
}
