import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {loadJsonData} from '../store/actions/data.actions';
import {setFilteredData, setFilters} from '../store/actions/filter.actions';
import {StoreTypes} from '../types/store.types';
import {addFileToHistory} from '../store/actions/history.actions';
import {HistoryData} from '../types/history.types';
import {minValueOptions, sortOptions} from '../components/filter/filter-config';
import {DataItem} from '../types/data.types';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private store: Store<StoreTypes> = inject(Store);

  public loadFile(file: File): void {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result as string;
      const data: Array<DataItem> = JSON.parse(result);

      this.onFileData(data);
      this.store.dispatch(addFileToHistory({
        historyData: this.getHistoryData(data, file.name)
      }));
    };

    reader.readAsText(file);
  }

  public onFileData(data: Array<DataItem>): void {
    this.resetFilters();
    this.store.dispatch(setFilteredData({ filteredData: data }));
    this.store.dispatch(loadJsonData({ data }));
  }

  private resetFilters(): void {
    this.store.dispatch(setFilters({
      filterOptions: {
        sortOption: sortOptions[0],
        minValueOption: minValueOptions[0]
      }
    }));
  }

  private getHistoryData(data: Array<DataItem>, fileName: string): HistoryData {
    return  {
      fileName,
      data,
      uploadDate: new Date().toISOString()
    };
  }
}
