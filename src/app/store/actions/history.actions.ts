import { createAction, props } from '@ngrx/store';
import { HistoryData } from '../../types/history.types';

export const addFileToHistory = createAction(
  '[File] Add to History',
  props<{ historyData: HistoryData }>()
);
