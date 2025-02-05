import { createAction, props } from '@ngrx/store';
import { DataItem } from '../../types/data.types';

export const loadJsonData = createAction(
  '[File Upload] Load JSON Data',
  props<{ data: Array<DataItem> }>()
);
