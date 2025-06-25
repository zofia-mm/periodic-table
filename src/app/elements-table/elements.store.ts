import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { addEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { PeriodicElement } from './periodic-element';
import { inject } from '@angular/core';
import { ElementService } from './element.service';

export const ElementsStore = signalStore(
  { providedIn: 'root' },
  withEntities<PeriodicElement>(),
  withMethods( (store) => { const elementService = inject(ElementService); return {
    
    loadElements() {
      elementService.getElements().subscribe(
        (elements) => patchState( store, addEntities(elements) )
      )
    },

    editElement( id: number, changes: any ) {
      patchState( store, updateEntity({ id: id, changes: changes }) );
    }
    
  }}),
  withHooks({
    onInit({ loadElements }) {
      loadElements();
    }
  })
);