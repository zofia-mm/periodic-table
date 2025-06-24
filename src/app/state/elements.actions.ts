import { createActionGroup, props } from '@ngrx/store';
import { PeriodicElement } from '../elements-table/periodic-element.model';

export const ElementsApiActions = createActionGroup({
  source: 'Elements API',
  events: {
    'Retrieved Elements List': props<{ elements: ReadonlyArray<PeriodicElement> }>()
  }
});