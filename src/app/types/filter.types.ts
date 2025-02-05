import {DataItem} from './data.types';

export type SortOption = {
  label: string;
  value: 'asc' | 'desc' | '';
};

export type MinValueOption = {
  label: string;
  value: '' | 'non-zero' | 'min';
};

export type FormFieldFilter = {
  label: string;
  value: string;
}

export type FilterOption = {
  sortOption: SortOption;
  minValueOption: MinValueOption;
}

export type FilterState = {
  filterOptions: FilterOption;
  filteredData: Array<DataItem>;
}
