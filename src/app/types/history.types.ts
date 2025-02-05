import {DataItem} from './data.types';

export type HistoryData = {
  fileName: string;
  data: Array<DataItem>;
  uploadDate: string
}

export type HistoryState = {
  histories: Array<HistoryData>;
}
