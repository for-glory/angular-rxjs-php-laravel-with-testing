import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
		private uploadService: UploadService,
		private dialogRef: MatDialogRef<UploadDialogComponent>,
		private snackbar: MatSnackBar
	) {}

	ngOnInit(): void {}

	selectFile() {
		this.fileInput.nativeElement.click();
	}

	fileChange(event: Event) {
		const files: FileList = (event as any).target?.files;
		if (files.length > 0) {
			if (files[0].size > 50 * 1024 * 1024) {
				this.snackbar.open('Uploading files larger than 50MB not allowed', undefined, {
					duration: 4000,
				});
				this.fileInput.nativeElement.value = '';
				return;
			}
			this.file = files[0];
		}
	}

	upload() {
		this.file && this.uploadService.upload(this.file).subscribe((result: UserVideo) => {
			this.dialogRef.close(result);
		});
	}
}
