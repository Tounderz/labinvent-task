import { createAction, props } from '@ngrx/store';
import { DataItem } from '../../models/data.model';

export const loadJsonData = createAction(
  '[File Upload] Load JSON Data',
  props<{ data: Array<DataItem> }>()
);
