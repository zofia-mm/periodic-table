import { Component, inject, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ElementService } from './elements-table/element.service';
import { ElementsTable } from "./elements-table/elements-table";

@Component({
  selector: 'app-root',
  imports: [ElementsTable,
    MatSlideToggleModule, MatToolbarModule, MatInputModule,
    MatIconModule, MatFormFieldModule, FormsModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  elementService: ElementService = inject(ElementService);
}
