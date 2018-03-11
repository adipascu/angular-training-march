import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';

import 'rxjs/add/operator/filter';

import { BookmarkDashboardService } from '../../bookmark-dashboard.service';

import { Bookmark } from '../../models/bookmark.interface';

@Component({
  selector: 'bookmark-dashboard',
  styleUrls: ['bookmark-dashboard.component.scss'],
  templateUrl: './bookmark-dashboard.component.html'
})
export class BookmarkDashboardComponent implements OnInit {
  bookmarks: Bookmark[];
  favorites: Bookmark[];

  constructor(
    private bookmarkService: BookmarkDashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.router.events
      .filter((event) => (event instanceof NavigationEnd || event instanceof RoutesRecognized))
      .subscribe((event) => {
        this.bookmarkService
          .getBookmarks()
          .subscribe((data: Bookmark[]) => {
            this.bookmarks = data;
            this.favorites = data.filter(bookmark => bookmark.favorite);
          });
      });

    this.bookmarkService
      .getBookmarks()
      .subscribe((data: Bookmark[]) => {
        this.bookmarks = data;
        this.favorites = data.filter(bookmark => bookmark.favorite);
      });
  }

  handleEdit(event: Bookmark) {
    this.bookmarkService
      .updateBookmark(event)
      .subscribe((data: Bookmark) => {
        this.bookmarks = this.bookmarks.map((bookmark: Bookmark) => {
          if (bookmark.id === event.id) {
            bookmark = Object.assign({}, bookmark, event);
          }
          return bookmark;
        });
      });
  }

  handleRemoveFromFavorites(event: Bookmark) {
    this.bookmarkService
      .updateBookmark(event)
      .subscribe((data: Bookmark) => {
        this.favorites = this.favorites.filter((bookmark: Bookmark) => {
          if (bookmark.id === event.id) {
            bookmark = Object.assign({}, bookmark, event);
          }
          this.favorites = this.favorites.filter((favorite: Bookmark) =>  favorite.id !== event.id);
        });
      });
  }

  handleRemove(event: Bookmark) {
    this.bookmarkService
      .removeBookmark(event)
      .subscribe((data: Bookmark) => {
        this.bookmarks = this.bookmarks.filter((bookmark: Bookmark) => {
          return bookmark.id !== event.id;
        });
      });
  }

  handleVisit(event: Bookmark) {
    this.router.navigateByUrl(event.url);
  }

  goToAdd() {
    this.router.navigate(['bookmarks', 'add-new']);
  }

}
