import { createReducer, on } from '@ngrx/store';
import { setFilters, setFilteredData } from '../actions/filter.actions';
import {FilterState} from '../../types/filter.types';
import {minValueOptions, sortOptions} from '../../components/filter/filter-config';

export const initialState: FilterState = {
  filterOptions: {
    sortOption: sortOptions[0],
    minValueOption: minValueOptions[0]
  },
  filteredData: []
};

export const filterReducer = createReducer(
  initialState,
  on(setFilters, (state, { filterOptions }) => ({
    ...state,
    filterOptions: {
      sortOption: filterOptions.sortOption,
      minValueOption: filterOptions.minValueOption
    }
  })),
  on(setFilteredData, (state, { filteredData }) => ({
    ...state,
    filteredData,
  }))
);
