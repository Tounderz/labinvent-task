import {Component, inject} from '@angular/core';
import {FileUploadService} from '../../services/file-upload.service';
import {ComponentModule} from '../../components/component.module';
import {HistoryData} from '../../types/history.types';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  imports: [
    ComponentModule
  ],
  styleUrl: './chart-page.component.less'
})
export class ChartPageComponent {
  private fileUploadService: FileUploadService = inject(FileUploadService);

  public onFileChange(file: File): void {
    this.fileUploadService.loadFile(file);
  }

  public onSelectFile(file: HistoryData): void {
    this.fileUploadService.onFileData(file.data);
  }
}
