import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { map, catchError } from 'rxjs/operators';


import { Bookmark } from './models/bookmark.interface';

const BOOKMARK_API: string = 'http://localhost:3000/bookmarks';

@Injectable()
export class BookmarkDashboardService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private handleError(error: any) {
    if (error instanceof Response) {
      return Observable.throw(error['error'] || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
  }

  getBookmarks(): Observable<Bookmark[]> {
    return this.http
      .get(BOOKMARK_API, { headers: this.headers })
      .pipe(
      map((response: HttpResponse<any>) => response),
      catchError((error: any) => this.handleError(error))
      );

  }

  getBookmark(id: number): Observable<Bookmark> {
    return this.http
      .get(`${BOOKMARK_API}/${id}`, { headers: this.headers })
      .pipe(
      map((response: HttpResponse<any>) => response),
      catchError((error: any) => this.handleError(error))
      );

  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http
      .post(`${BOOKMARK_API}`, bookmark, { headers: this.headers })
      .pipe(
      map((response: HttpResponse<any>) => { response; console.log('response', response) }),
      catchError((error: any) => this.handleError(error))
      )
  }

  updateBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http
      .put(`${BOOKMARK_API}/${bookmark.id}`, bookmark, { headers: this.headers })
      .pipe(
      map((response: HttpResponse<any>) => response),
      catchError((error: any) => this.handleError(error))
      )
  }

  removeBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http
      .delete(`${BOOKMARK_API}/${bookmark.id}`, { headers: this.headers })
      .pipe(
      map((response: HttpResponse<any>) => response),
      catchError((error: any) => this.handleError(error))
      )
  }

}
