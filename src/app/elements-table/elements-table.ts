import { Component, inject, Input, model, signal } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { ElementsStore } from "./elements.store";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { PeriodicElement } from "./periodic-element";
import { CommonModule } from "@angular/common";
import { merge } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export enum ColumnNames {
  Position = "position",
  Name = "name",
  Weight = "weight",
  Symbol = "symbol"
}

export interface ChangeValueDialogData {
  chosenColumn: ColumnNames,
  element: PeriodicElement
}

@Component({
  selector: "app-elements-table",
  imports: [
    CommonModule,
    MatTableModule, MatDialogModule
  ],
  templateUrl: "./elements-table.html",
  styleUrl: "./elements-table.css"
})
export class ElementsTable {
  ColumnNames = ColumnNames;
  displayedColumns: String[] = Object.values( ColumnNames );
  readonly elementsStore = inject( ElementsStore );

  readonly dialog = inject( MatDialog );
  openEditValueDialog(
    chosenColumn: ColumnNames,
    element: PeriodicElement
  ) {
    const dialogRef = this.dialog.open( EditValueDialog, { data: {
      chosenColumn: chosenColumn,
      element: element
    } } );

    dialogRef.afterClosed().subscribe( result => {
      if( result !== "" ) {
        this.elementsStore.editElement( element.id, { [chosenColumn]: result } )
      }
    } );
  }
}

@Component({
  selector: "app-edit-value-dialog",
  imports: [
    CommonModule, FormsModule,  ReactiveFormsModule,
    MatDialogModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatFormFieldModule
  ],
  templateUrl: "./edit-value.dialog.html"
})
export class EditValueDialog {
  ColumnNames = ColumnNames;

  readonly data = inject<ChangeValueDialogData>( MAT_DIALOG_DATA );
  readonly columnName: ColumnNames = this.data.chosenColumn;

  readonly positionInput = new FormControl( this.data.element.position, [
    Validators.required, Validators.min(0), Validators.pattern("[0-9]+")
  ] );
  positionErrorMessage = signal("");
  updatePositionErrorMessage() {
    if( this.positionInput.hasError( "required" ) ) {
      this.positionErrorMessage.set( "Position cannot be empty." );
    }
    else if( this.positionInput.hasError( "min" ) ) {
      this.positionErrorMessage.set( "Position cannot be negative." );
    }
    else if( this.positionInput.hasError( "pattern" ) ) {
      this.positionErrorMessage.set( "Position has to be an integer." );
    }
  }

  readonly nameInput = new FormControl( this.data.element.name, [
    Validators.required, Validators.maxLength(20)
  ] );
  nameErrorMessage = signal("");
  updateNameErrorMessage() {
    if( this.nameInput.hasError( "required" ) ) {
      this.nameErrorMessage.set( "Name cannot be empty." );
    }
    else if( this.nameInput.hasError( "maxlength" ) ) {
      this.nameErrorMessage.set( "Name too long." )
    }
  }

  readonly weightInput = new FormControl( this.data.element.weight, [
    Validators.required, Validators.min(0),
    Validators.pattern( "[0-9]*\\.?(?=[0-9])[0-9]*" )
  ] );
  weightErrorMessage = signal("");
  updateWeightErrorMessage() {
    if( this.weightInput.hasError( "required" ) ) {
      this.weightErrorMessage.set( "Weight cannot be empty." );
    }
    else if( this.weightInput.hasError( "min" ) ) {
      this.weightErrorMessage.set( "Weight cannot be negative." );
    }
    else if( this.weightInput.hasError( "pattern" ) ) {
      this.weightErrorMessage.set( "Weight has to be a real number." );
    }
  }

  readonly symbolInput = new FormControl( this.data.element.symbol, [
    Validators.required, Validators.maxLength(5)
  ] );
  symbolErrorMessage = signal("");
  updateSymbolErrorMessage() {
    if( this.symbolInput.hasError( "required" ) ) {
      this.symbolErrorMessage.set( "Symbol cannot be empty." );
    }
    else if( this.symbolInput.hasError( "maxlength" ) ) {
      this.symbolErrorMessage.set( "Symbol too long." );
    }
  }

  constructor() {
    this.positionInput.markAsTouched();
    merge( this.positionInput.statusChanges, this.positionInput.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.updatePositionErrorMessage() );

    this.nameInput.markAsTouched();
    merge( this.nameInput.statusChanges, this.nameInput.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.updateNameErrorMessage() );
    
    this.weightInput.markAsTouched();
    merge( this.weightInput.statusChanges, this.weightInput.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.updateWeightErrorMessage() );

    this.symbolInput.markAsTouched();
    merge( this.symbolInput.statusChanges, this.symbolInput.valueChanges )
      .pipe( takeUntilDestroyed() )
      .subscribe( () => this.updateSymbolErrorMessage() );
  }

  onClose(): any {
    switch( this.columnName ) {
      case ColumnNames.Position: { return this.positionInput.value }
      case ColumnNames.Name: { return this.nameInput.value }
      case ColumnNames.Weight: { return this.weightInput.value }
      case ColumnNames.Symbol: { return this.symbolInput.value }
    }
  }
}