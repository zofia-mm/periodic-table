import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { PeriodicElement } from './periodic-element';
import { inject } from '@angular/core';
import { ElementService } from './element.service';

type ElementsState = {
  elements: PeriodicElement[];
}

const initialState : ElementsState = {
  elements: []
};

export const ElementsStore = signalStore(
  { providedIn: 'root' },
  withState( initialState ),
  withMethods( (store, elementService = inject(ElementService)) => ({
    loadElements() {
      elementService.getElements().subscribe(
        (elements) => patchState( store, {elements} )
      )
    }
  })),
  withHooks({
    onInit({ loadElements }) {
      loadElements();
    }
  })
);