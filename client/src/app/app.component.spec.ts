import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { UserVideo } from './common/services/upload/user-video';
import { UploadService } from './common/services/upload/upload.service';

describe('AppComponent', () => {
  let uploadService: UploadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatIconModule,
        MatSnackBarModule,
        MatToolbarModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    uploadService = TestBed.inject(UploadService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mat-toolbar span')?.textContent).toContain('Video Manager');
  });

  describe('Video Manager', () => {
    it('should correctly get existing videos to display', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;

      spyOn(uploadService, 'getVideos').and.returnValue(of([{id: 1, path: 'bogus/path'} as UserVideo]));

      fixture.detectChanges();
      component.videos$.subscribe((item) => {
        expect(item).toEqual([{id: 1, path: 'bogus/path'} as UserVideo]);
      });
    });
  });
});
