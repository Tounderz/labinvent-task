import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {D3ChartComponent} from './d3-chart/d3-chart.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {FileUpload} from 'primeng/fileupload';
import {Toast} from 'primeng/toast';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SelectButton} from "primeng/selectbutton";
import {Select} from "primeng/select";
import {HistoryComponent} from './history/history.component';
import {TableModule} from 'primeng/table';
import {Button, ButtonDirective} from 'primeng/button';
import {FilterComponent} from './filter/filter.component';


@NgModule({
  declarations: [
    D3ChartComponent,
    FileUploadComponent,
    FilterComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    FileUpload,
    Toast,
    FormsModule,
    ReactiveFormsModule,
    SelectButton,
    Select,
    TableModule,
    ButtonDirective,
    Button
  ],
  exports: [
    D3ChartComponent,
    FileUploadComponent,
    FilterComponent,
    HistoryComponent
  ]
})
export class ComponentModule { }
