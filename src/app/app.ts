import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ElementService } from './elements-table/element.service';
import { ElementsTable } from "./elements-table/elements-table";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatSlideToggleModule, MatToolbarModule, MatInputModule,
    MatIconModule, ElementsTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'periodic-table';

  elementService: ElementService = inject(ElementService);
}
