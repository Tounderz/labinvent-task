import { createReducer, on } from '@ngrx/store';
import {loadJsonData} from './data.actions';
import {DataItem} from '../../models/data.model';

export interface DataState {
  data: Array<DataItem>;
}

export const initialState: DataState = {
  data: []
};

export const dataReducer = createReducer(
  initialState,
  on(loadJsonData, (state, { data }) => ({
    ...state,
    data: data
  }))
);
