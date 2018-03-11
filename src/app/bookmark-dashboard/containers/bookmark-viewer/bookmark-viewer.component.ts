import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { BookmarkDashboardService } from '../../bookmark-dashboard.service';

import { Bookmark } from '../../models/bookmark.interface';

@Component({
  selector: 'bookmark-viewer',
  templateUrl: './bookmark-viewer.component.html'
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
