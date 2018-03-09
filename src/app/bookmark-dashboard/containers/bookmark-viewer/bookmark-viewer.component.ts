import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { BookmarkDashboardService } from '../../bookmark-dashboard.service';

import { Bookmark } from '../../models/bookmark.interface';

@Component({
  selector: 'bookmark-viewer',
  styleUrls: ['bookmark-viewer.component.scss'],
  template: `
    <div class="centered">
      <div class="bookmark-view">
      <button (click)="goBack()">&lsaquo; Go Back</button>
      <bookmark-form
        [detail]="bookmark"
        (update)="onUpdateBookmark($event)"
        (create)="onCreateBookmark($event)"
        >
      </bookmark-form>
      </div>
    </div>
    <div class="centered" *ngIf="!isLoaded">Loading bookmark info...</div>
  `,
})
export class BookmarkViewerComponent implements OnInit {
  bookmark: Bookmark;
  isLoaded: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookmarkService: BookmarkDashboardService
  ) { }
  ngOnInit() {
    this.route.params
      .switchMap((data: Bookmark) => this.bookmarkService.getBookmark(data.id))
      .subscribe((data: Bookmark) => {
        // added the timeout to simulate a slower connection/loading status
        this.bookmark = data;
        this.isLoaded = true;

      });
  }
  onUpdateBookmark(event: Bookmark) {
    this.bookmarkService
      .updateBookmark(event)
      .subscribe((data: Bookmark) => {
        this.bookmark = Object.assign({}, this.bookmark, event);
      });
  }

  onCreateBookmark(event: Bookmark) {
    this.bookmarkService
      .addBookmark(event)
      .subscribe((data: Bookmark) => {
        this.bookmark = Object.assign({}, this.bookmark, event);
      });
  }

  goBack() {
    this.router.navigate(['/bookmarks']);
  }
}
