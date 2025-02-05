import { createAction, props } from '@ngrx/store';
import {DataItem} from '../../types/data.types';
import {FilterOption} from '../../types/filter.types';

export const setFilters = createAction(
  '[Filter] Set Filters',
  props<{ filterOptions: FilterOption }>()
);

export const setFilteredData = createAction(
  '[Filter] Set Filtered Data',
  props<{ filteredData: Array<DataItem> }>()
);
