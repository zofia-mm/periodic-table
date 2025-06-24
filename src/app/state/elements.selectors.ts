import { createFeatureSelector } from "@ngrx/store";
import { PeriodicElement } from "../elements-table/periodic-element.model";

export const selectElements = createFeatureSelector<ReadonlyArray<PeriodicElement>>('elements');

