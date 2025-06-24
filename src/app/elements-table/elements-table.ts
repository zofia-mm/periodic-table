import { Component, Input } from '@angular/core';
import { PeriodicElement } from './periodic-element.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-elements-table',
  imports: [ CommonModule ],
  templateUrl: './elements-table.html',
  styleUrl: './elements-table.css'
})
export class ElementsTable {
  @Input() elements: ReadonlyArray<PeriodicElement> = [];
}
