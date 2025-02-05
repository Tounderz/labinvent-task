import { createReducer, on } from '@ngrx/store';
import {loadJsonData} from '../actions/data.actions';
import {DataState} from '../../types/data.types';

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
