import { Component, inject, model } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ElementsStore } from './elements.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

export interface ChangeValueDialogData {
  valueLabel: string,
  value: any
}

@Component({
  selector: 'app-elements-table',
  imports: [ MatTableModule, MatDialogModule ],
  templateUrl: './elements-table.html',
  styleUrl: './elements-table.css'
})
export class ElementsTable {
  displayedColumns: String[] = ["position", "name", "weight", "symbol"];
  readonly elementsStore = inject( ElementsStore );

  readonly dialog = inject( MatDialog );
  openEditValueDialog( valueLabel: string, value: any, elementId: number ) {

    const dialogRef = this.dialog.open( EditValueDialog, { data: {
      valueLabel: valueLabel,
      value: value
    } } );

    dialogRef.afterClosed().subscribe( result => {
      if( result !== "" ) {
        this.elementsStore.editElement( elementId, { [valueLabel]: result } )
      }
    } );
  }
}

@Component({
  selector: 'app-edit-value-dialog',
  imports: [
    MatDialogModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, FormsModule
  ],
  templateUrl: './edit-value.dialog.html'
})
export class EditValueDialog {
  readonly data = inject<ChangeValueDialogData>( MAT_DIALOG_DATA );
  readonly value = model( this.data.value );
  valueLabel = this.data.valueLabel;
}