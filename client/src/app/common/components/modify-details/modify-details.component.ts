import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadService } from '../../services/upload/upload.service';
import { UserVideo } from '../../services/upload/user-video';

@Component({
	selector: 'app-modify-details',
	templateUrl: './modify-details.component.html',
	styleUrls: ['./modify-details.component.scss']
})
export class ModifyDetailsComponent implements OnInit {
	constructor(
		private uploadService: UploadService,
		private dialogRef: MatDialogRef<ModifyDetailsComponent>,
		@Inject(MAT_DIALOG_DATA) public video: UserVideo
	) {}

	ngOnInit(): void {}

	modifyDetails() {
		this.uploadService.modify(this.video.id, this.video.title, this.video.desc).subscribe((result: UserVideo) => {
			this.dialogRef.close(result);
		});
	}
}
