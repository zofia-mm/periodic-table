import { signalStore, withState } from '@ngrx/signals';
import { PeriodicElement } from "./elements-table/periodic-element.model"

type ElementsSearchState = {
  elements: PeriodicElement[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' }
}

const initialState: ElementsSearchState = {
  elements: [],
  isLoading: false,
  filter: { query: '', order: 'asc' }
}

export const ElementSearchStore = signalStore(
  withState(initialState)
);