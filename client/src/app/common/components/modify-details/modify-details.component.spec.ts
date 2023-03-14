import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ModifyDetailsComponent } from './modify-details.component';
import { MatIconModule } from '@angular/material/icon';
import { UploadService } from '../../services/upload/upload.service';
import { UserVideo } from '../../services/upload/user-video';
import { of } from 'rxjs';

describe('ModifyDetailsComponent', () => {
	let component: ModifyDetailsComponent;
	let fixture: ComponentFixture<ModifyDetailsComponent>;
	let uploadService: UploadService;
	let dialogRefMock!: jasmine.SpyObj<MatDialogRef<ModifyDetailsComponent, any>>;
	let snackbarMock!: jasmine.SpyObj<MatSnackBar>;

	beforeEach(async () => {
		dialogRefMock = jasmine.createSpyObj(['close']);
		snackbarMock = jasmine.createSpyObj(['open']);
		await TestBed.configureTestingModule({
			imports: [FormsModule, HttpClientTestingModule, MatDialogModule, MatIconModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule],
			declarations: [ModifyDetailsComponent],
			providers: [
				{ provide: MatDialogRef, useValue: dialogRefMock },
				{ provide: MatSnackBar, useValue: snackbarMock },
				{ provide: MAT_DIALOG_DATA, useValue: {} },
			]
		}).compileComponents();

		uploadService = TestBed.inject(UploadService);
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ModifyDetailsComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('modify', () => {
		it('should call the upload.service modify method, close the dialog when finished', () => {
			const mockVideo = {
				id: 1,
				title: 'title',
				desc: 'desc',
				path: 'bogus/path',
			} as UserVideo
			component.video = mockVideo;
			spyOn(uploadService, 'modify').and.returnValue(
				of(mockVideo)
			);
			fixture.detectChanges();

			component.modifyDetails();

			expect(uploadService.modify).toHaveBeenCalled();
			expect(dialogRefMock.close).toHaveBeenCalled();
		});
	});
});
