import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadDialogComponent } from './common/components/upload-dialog/upload-dialog.component';
import { UploadService } from './common/services/upload/upload.service';
import { UserVideo } from './common/services/upload/user-video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  videos: UserVideo[] = [];

  constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private upload: UploadService) {}

  ngOnInit(): void {
    this.getVideos();
  }

  async getVideos() {
    this.videos = await this.upload.getVideos();
  }

  openUpload() {
    const dialogRef = this.dialog.open(UploadDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if(result) {
        this.videos = [...this.videos, result[0]];
        this.snackbar.open('File successfully uploaded');
      }
    });
  }
}
