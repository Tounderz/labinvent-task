import {Component, EventEmitter, Output} from '@angular/core';
import {FileSelectEvent} from 'primeng/fileupload';
import {MessageService} from 'primeng/api';
import {MAX_FILE_SIZE} from './file-upload-config';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.less',
  providers: [MessageService]
})
export class FileUploadComponent {
  @Output() fileChange: EventEmitter<File> = new EventEmitter<File>();

  public readonly maxFileSize: number = MAX_FILE_SIZE;

  public onFileChange(event: FileSelectEvent): void {
    const file = event.files[0];
    if (!file) { return; }

    this.fileChange.emit(file);
  }
}
