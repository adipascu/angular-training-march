import { Component } from '@angular/core';
import { Bookmark } from '../../models/bookmark.interface';

import { BookmarkDashboardService } from '../../bookmark-dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bookmark-add',
  templateUrl: './bookmark-add.component.html'
})
export class BookmarkAddComponent {
  saved: boolean;
  detail: Bookmark;
  constructor(
    private bookmarkService: BookmarkDashboardService,
    private router: Router
  ) { }

  handleSubmit(bookmark: Bookmark, isValid: boolean) {
    bookmark.favorite = false;
    bookmark.description = '';
    this.bookmarkService
      .addBookmark(bookmark)
      .subscribe((data) => {
        this.saved = true;
        setTimeout(() => {
          this.router.navigate(['/bookmarks']);
        }, 1000);
      });
  }

}
