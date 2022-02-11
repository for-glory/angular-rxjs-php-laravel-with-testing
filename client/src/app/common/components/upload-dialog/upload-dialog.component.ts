import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadService } from '../../services/upload/upload.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  file: File | null = null;

  constructor(
    private snackbar: MatSnackBar,
    private uploadService: UploadService,
    private dialogRef: MatDialogRef<UploadDialogComponent>
  ) {}

  ngOnInit(): void {}

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  fileChange(event: Event) {
    const files: FileList = (event as any).target?.files;
    if(files.length > 0) {
      this.file = files[0];
    }
  }

  async upload() {
    if(this.file) {
      console.log('UPLOAD VIDEO');
      const result = await this.uploadService.upload(this.file);
      this.dialogRef.close(result);
    } else {
      this.snackbar.open('Please select a file to upload');
    }
  }
}
