import { Component, Input } from '@angular/core';

import { Bookmark } from '../../models/bookmark.interface';

@Component({
  selector: 'bookmark-count',
  template: `
    <div>
      <h3>Our Precious Bookmarks!</h3>
      <div *ngIf="items?.length > 0">
        Total bookmarks: {{ items?.length }}
      </div>
      <div *ngIf="!items?.length"> Please add some bookmarks</div>
    </div>
  `
})
export class BookmarkCountComponent {
  @Input()
  items: Bookmark[];

  constructor() {

  }
}
