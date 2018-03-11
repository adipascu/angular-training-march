import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

import { Bookmark } from '../../models/bookmark.interface';

@Component({
  selector: 'bookmark-form',
  styleUrls: ['bookmark-form.component.scss'],
  templateUrl: './bookmark-form.component.html'
})
export class BookmarkFormComponent {

  @Input()
  detail: Bookmark;

  @Output()
  update: EventEmitter<Bookmark> = new EventEmitter<Bookmark>();

  @Output()
  create: EventEmitter<Bookmark> = new EventEmitter<Bookmark>();

  isNewBookmark: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  toggleFavorite(favorite: boolean) {
    this.detail.favorite = favorite;
  }

  handleSubmit(bookmark: Bookmark, isValid: boolean) {
    if (isValid) {
      bookmark.id = this.detail.id;
      this.update.emit(bookmark);
      return this.router.navigate(['/bookmarks']);
    }
  }

}
