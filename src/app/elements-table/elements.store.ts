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
        (elements) => {patchState( store, addEntities(elements) ); console.log( elements )}
      )
    },

    editElement( element: PeriodicElement, changes: any ) {
      const changes1 = ( element1: PeriodicElement ) => ({ position: 22 });
      patchState( store, updateEntity({ id: element.id, changes: changes1 }) );
    }
    
  }}),
  withHooks({
    onInit({ loadElements }) {
      loadElements();
    }
  })
);