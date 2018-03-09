import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Bookmark } from '../../models/bookmark.interface';

@Component({
  selector: 'bookmark-detail',
  styleUrls: ['bookmark-detail.component.scss'],
  template: `
    <div class="bookmark">
      <div *ngIf="editing">
        <input
          type="text"
          [value]="detail.title"
          (input)="onTitleChange(name.value)"
          #name>
      </div>
      <div *ngIf="!editing">
        {{ detail.title }}
      </div>
      <button (click)="toggleEdit()">
        {{ editing ? '&#9996; Done editing' : '&#9755; Edit title' }}
      </button>
      <button (click)="onRemoveFromFavorites()">
        - Remove from favorites
      </button>
       <a class="button" target="_blank" [href]="detail?.url" rel="noopener">
        Visit &rarr;
      </a>
    </div>
  `
})
export class BookmarkDetailComponent implements OnChanges {

  @Input()
  detail: Bookmark;

  @Output()
  edit: EventEmitter<Bookmark> = new EventEmitter<Bookmark>();

  @Output()
  removeFromFavorites: EventEmitter<Bookmark> = new EventEmitter<Bookmark>();

  @Output()
  remove: EventEmitter<Bookmark> = new EventEmitter<Bookmark>();

  editing: boolean = false;

  constructor() { }

  ngOnChanges(changes) {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
  }

  onTitleChange(value: string) {
    this.detail.title = value;
  }

  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }
  onRemoveFromFavorites() {
    this.detail.favorite = false;
    this.removeFromFavorites.emit(this.detail);
  }

}
