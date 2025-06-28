import { patchState, signalStore, signalStoreFeature, withComputed, withFeature, withHooks, withMethods, withState } from '@ngrx/signals';
import { addEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { PeriodicElement } from './periodic-element';
import { computed, inject, Signal } from '@angular/core';
import { ElementService } from './element.service';

export function withElementsFilter( elements: Signal<PeriodicElement[]> ) {
  return signalStoreFeature(
    withState({ query: "" }),
    withComputed(({ query }) => ({

      filteredElements: computed(() => 
        elements().filter( (element) =>
          element.position
            .toString()
            .toLowerCase()
            .includes( query().toLowerCase() ) ||
          element.name
            .toLowerCase()
            .includes( query().toLowerCase() ) ||
          element.weight
            .toString()
            .toLowerCase()
            .includes( query().toLowerCase() ) ||
          element.symbol
            .toLowerCase()
            .includes( query().toLowerCase() )
          )
          
      )
      
    })),
    withMethods((store) => ({

      updateQuery(query: string): void {
        patchState( store, { query } );
      }

    }))
  );
}

export const ElementsStore = signalStore(
  { providedIn: 'root' },
  withState({ isLoading: false, filter: { query: "" } }),
  withEntities<PeriodicElement>(),
  withFeature(({ entities }) => withElementsFilter(entities)),
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
