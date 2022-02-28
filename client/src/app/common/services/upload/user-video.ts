export interface UserVideo {
  id: number;
  path: string;
  created_at: string;
}

export interface UserVideoListResponse {
  data: UserVideo[];
}

export interface UserVideoResponse {
  data: UserVideo;
}
