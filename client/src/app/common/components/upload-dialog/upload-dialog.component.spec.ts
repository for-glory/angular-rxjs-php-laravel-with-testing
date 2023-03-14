import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { UploadDialogComponent } from './upload-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { UploadService } from '../../services/upload/upload.service';
import { UserVideo } from '../../services/upload/user-video';
import { of } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

describe('UploadDialogComponent', () => {
	let component: UploadDialogComponent;
	let fixture: ComponentFixture<UploadDialogComponent>;
	let uploadService: UploadService;
	let dialogRefMock!: jasmine.SpyObj<MatDialogRef<UploadDialogComponent, any>>;
	let snackbarMock!: jasmine.SpyObj<MatSnackBar>;

	beforeEach(async () => {
		dialogRefMock = jasmine.createSpyObj(['close']);
		snackbarMock = jasmine.createSpyObj(['open']);
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, MatDialogModule, MatIconModule, MatSnackBarModule, NoopAnimationsModule, MatFormFieldModule, MatInputModule, FormsModule],
			declarations: [UploadDialogComponent],
			providers: [
				{ provide: MatDialogRef, useValue: dialogRefMock },
				{ provide: MatSnackBar, useValue: snackbarMock },
			]
		}).compileComponents();

		uploadService = TestBed.inject(UploadService);
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UploadDialogComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('file', () => {
		it('should select file if its size is not greater than 50MB', () => {
			const buffer = new ArrayBuffer(50 * 1024 * 1024);
			const mockFile = new File([buffer], '50MB.mp4');
			const mockEvt = {
				target: {
					files: [mockFile],
				},
			};

			component.fileChange(mockEvt as any);

			expect(component.file).toBe(mockFile);
		});

		it('should show snackbar, reset file input element, not select file if its size is greater than 50MB', () => {
			const buffer = new ArrayBuffer(50 * 1024 * 1024 + 1);
			const mockFile = new File([buffer], 'greaterThan50MB.mp4');
			const mockEvt = {
				target: {
					files: [mockFile],
				},
			};

			component.fileInput = new ElementRef({
				value: 'test',
			});
			component.fileChange(mockEvt as any);

			expect(snackbarMock.open).toHaveBeenCalled();
			expect(component.fileInput.nativeElement.value).toEqual('');
			expect(component.file).toBeNull();
		});
	});

	describe('upload', () => {
		it('should call the upload.service upload method, close the dialog when finished, if a file was chosen', () => {
			component.file = new File([''], 'bogusFile', { type: 'text/html' });
			spyOn(uploadService, 'upload').and.returnValue(
				of({ id: 1, path: 'bogus/path' } as UserVideo)
			);
			fixture.detectChanges();

			component.upload();

			expect(uploadService.upload).toHaveBeenCalled();
			expect(dialogRefMock.close).toHaveBeenCalled();
		});

		it('should do nothing when calling the upload.service upload method if no file was chosen', () => {
			component.file = null;
			spyOn(uploadService, 'upload').and.returnValue(
				of({ id: 1, path: 'bogus/path' } as UserVideo)
			);
			fixture.detectChanges();

			component.upload();

			expect(uploadService.upload).not.toHaveBeenCalled();
			expect(dialogRefMock.close).not.toHaveBeenCalled();
		});
	});
});
