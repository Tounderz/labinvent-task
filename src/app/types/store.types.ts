import {DataState} from './data.types';
import {FilterState} from './filter.types';
import {HistoryState} from './history.types';

export type StoreTypes = {
  data: DataState;
  filteredData: FilterState;
  history: HistoryState;
}
