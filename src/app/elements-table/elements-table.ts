import { Component, Input } from '@angular/core';
import { PeriodicElement } from './periodic-element.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-elements-table',
  imports: [ CommonModule, MatTableModule ],
  templateUrl: './elements-table.html',
  styleUrl: './elements-table.css'
})
export class ElementsTable {
  @Input() elements: ReadonlyArray<PeriodicElement> = [];

  displayedColumns: String[] = [ "position", "name", "weight", "symbol" ];
  dataSource: {position: number}[] = [{ position: 1 }, {position: 2}]
  
}
