import {FilterOption, SortOption} from '../components/chart-filter/chart-filter-config';
import {DataItem} from '../models/data.model';

export interface FilterState {
  sortOption: SortOption;
  minValue: FilterOption;
  filterData: Array<DataItem>;
}
