import {Component, inject, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {StoreTypes} from '../../types/store.types';
import {Observable, Subscription} from 'rxjs';
import {DataItem} from '../../types/data.types';
import {FilterState, FormFieldFilter, MinValueOption, SortOption} from '../../types/filter.types';
import {FormControl, FormGroup} from '@angular/forms';
import {formFields, minValueOptions, sortOptions} from './filter-config';
import {setFilteredData, setFilters } from '../../store/actions/filter.actions';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.less'
})
export class FilterComponent implements OnInit, OnDestroy {
  private store: Store<StoreTypes> = inject(Store);

  public data$: Observable<Array<DataItem>> = this.store.select(state => state.data.data);
  public filteredData$: Observable<FilterState> = this.store.select(state => state.filteredData);
  public readonly formFields = formFields;
  public formGroup: FormGroup = new FormGroup({});
  private subscriptions: Subscription = new Subscription();
  private data: Array<DataItem> = [];
  private sortOption: string = '';
  private minValueOption: string = '';

  public ngOnInit(): void {
    this.initForm();
    this.initSubscriptions();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public applyFilters(): void {
    this.setFilters();
    this.setFilteredData();
  }

  public getOptions(key: string): Array<MinValueOption> | Array<SortOption> {
    return key === 'sortOrder' ? sortOptions : minValueOptions;
  }

  private initForm(): void {
    const group: { [key: string]: FormControl } = {};
    this.formFields.forEach((field: FormFieldFilter) => {
      group[field.value] = new FormControl('', []);
    });

    this.formGroup = new FormGroup(group);
  }

  private initSubscriptions(): void {
    this.subscriptions.add(this.data$.subscribe((data: Array<DataItem>) => this.onDataChange(data)));
    this.subscriptions.add(this.filteredData$.subscribe((data: FilterState) => this.onFilterChange(data)));
  }

  private onDataChange(data: Array<DataItem>): void {
    this.data = data;
    this.applyFilters();
  }

  private onFilterChange(data: FilterState): void {
    const { sortOption, minValueOption } = data.filterOptions;
    this.sortOption = sortOption.value;
    this.minValueOption = minValueOption.value;
    this.formGroup.patchValue({
      sortOrder: this.sortOption,
      minValueFilter: this.minValueOption
    });
  }

  private setFilters(): void {
    this.sortOption = this.formGroup.get('sortOrder')?.value;
    this.minValueOption = this.formGroup.get('minValueFilter')?.value;
    this.store.dispatch(setFilters({
      filterOptions: {
        sortOption: sortOptions.find(i => i.value === this.sortOption) ?? sortOptions[0],
        minValueOption: minValueOptions.find(i => i.value === this.minValueOption) ?? minValueOptions[0]
      }
    }));
  }

  private setFilteredData(): void {
    const filteredData = this.filterData(this.data);
    const sortedData = this.sortData(filteredData);
    this.store.dispatch(setFilteredData({ filteredData: sortedData }));
  }

  private sortData(data: Array<DataItem>): Array<DataItem> {
    const sortMap: { [key: string]: (a: DataItem, b: DataItem) => number } = {
      asc: (a, b) => a.category.localeCompare(b.category),
      desc: (a, b) => b.category.localeCompare(a.category),
      '': () => 0,
    };

    return data.sort(sortMap[this.sortOption] || sortMap['']);
  }

  private filterData(data: Array<DataItem>): Array<DataItem> {
    const filterMap: { [key: string]: (item: DataItem) => boolean } = {
      'non-zero': (item) => item.value > 0,
      'min': (item) => item.value > Math.min(...data.map(d => d.value)),
      '': () => true,
    };

    return data.filter(filterMap[this.minValueOption] || filterMap['']);
  }
}
