import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { UploadService } from '../../services/upload/upload.service';
import { UserVideo } from '../../services/upload/user-video';

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

  upload() {
    if(this.file) {
      console.log('UPLOAD VIDEO');
      this.uploadService.upload(this.file).pipe(
          // Alert the user that it worked.
          finalize(() => this.snackbar.open('File successfully uploaded'))
      ).subscribe((result: UserVideo) => {
        this.dialogRef.close(result);
      });
    } else {
      this.snackbar.open('Please select a file to upload');
    }
  }
}
