import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserVideo } from './user-video';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) { }

  async getVideos(): Promise<UserVideo[]> {
    return (await lastValueFrom(this.http.get<UserVideoListResponse>(`${environment.apiBaseUrl}/videos`)));
  }

  async upload(file: File): Promise<UserVideo> {
    console.log(file);
    const formData = new FormData()
    formData.append('video', file, file.name);

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    return (await lastValueFrom(this.http.post<UserVideoResponse>(`${environment.apiBaseUrl}/videos`, formData, {headers})));
  }
}
