import { createReducer, on } from "@ngrx/store";
import { PeriodicElement } from "../elements-table/periodic-element.model";
import { ElementsApiActions } from "./elements.actions";

export const initialState: ReadonlyArray<PeriodicElement> = [];

export const elementsReducer = createReducer(
  initialState,
  on(
    ElementsApiActions.retrievedElementsList,
    (_state, {elements}) => elements
  )
);