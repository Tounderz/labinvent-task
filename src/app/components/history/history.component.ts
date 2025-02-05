import {Component, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HistoryData} from '../../types/history.types';
import {Store} from '@ngrx/store';
import {StoreTypes} from '../../types/store.types';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.less'
})
export class HistoryComponent implements OnInit, OnDestroy {
  @Output() fileSelected: EventEmitter<HistoryData> = new EventEmitter<HistoryData>();

  private store: Store<StoreTypes> = inject(Store);
  private subscriptions: Subscription = new Subscription();
  private fileHistory$: Observable<Array<HistoryData>> = this.store.select(state => state.history.histories);
  public data: Array<HistoryData> = [];

  public ngOnInit(): void {
    this.initSubscribe();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public selectFile(file: HistoryData): void {
    this.fileSelected.emit(file);
  }

  private initSubscribe(): void {
    this.subscriptions.add(
      this.fileHistory$.subscribe(data => {
          if (data?.length) { this.data = data; }
        }
      ));
  }
}
