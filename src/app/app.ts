import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatSlideToggleModule, MatToolbarModule, MatInputModule,
    MatIconModule, MatTableModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'periodic-table';
  displayedColumns: String[] = ["position"];
  dataSource: {position: number}[] = [{ position: 1 }, {position: 2}]
}
