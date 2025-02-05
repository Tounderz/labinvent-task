import { createReducer, on } from '@ngrx/store';
import { addFileToHistory } from '../actions/history.actions';
import { HistoryState } from '../../types/history.types';

export const initialState: HistoryState = {
  histories: []
};

export const historyReducer = createReducer(
  initialState,
  on(addFileToHistory, (state, { historyData }) => ({
    ...state,
    histories: [
      ...state.histories.slice(-4),
      { ...historyData }
    ]
  }))
);
