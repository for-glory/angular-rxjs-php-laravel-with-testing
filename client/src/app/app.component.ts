import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concat, concatMap, filter, finalize, forkJoin, map, mergeMap, NEVER, Observable, of, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { UploadDialogComponent } from './common/components/upload-dialog/upload-dialog.component';
import { UploadService } from './common/services/upload/upload.service';
import { UserVideo } from './common/services/upload/user-video';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  videos$!: Observable<UserVideo[]>;

  constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private upload: UploadService) {}

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos() {
    this.videos$ = this.upload.getVideos().pipe(shareReplay());
  }

  openUpload() {
    const dialogRef = this.dialog.open<UploadDialogComponent, any, UserVideo>(UploadDialogComponent);
    const dialog$ = dialogRef.afterClosed().pipe(
      // Log out what they did
      tap((result: UserVideo|undefined) => console.log('Dialog result:', result ?? 'canceled')),

      // Ignore if they close the dialog
      filter((result: UserVideo|undefined): result is UserVideo => result != null)
    );

    // Combine the result with the existing list
    const newVideos$ = forkJoin([this.videos$, dialog$]).pipe(
      map(([existingVideos, newVideo]) => existingVideos.concat([newVideo]))
    );

    // Then update our async pipe.
    // concat to keep the value of the old list until the new dialog is shown
    this.videos$ = concat(this.videos$, newVideos$);
  }
}
