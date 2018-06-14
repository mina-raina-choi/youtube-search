import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { SearchResult } from './search-result.model';

export const YOUTUBE_API_KEY =
  'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
export const YOUTUBE_API_URL =
  'https://www.googleapis.com/youtube/v3/search';


@Injectable()
export class YouTubeSearchService {
    
}