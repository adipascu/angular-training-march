import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

import { Bookmark } from '../../models/bookmark.interface';

@Component({
  selector: 'bookmark-form',
  styleUrls: ['bookmark-form.component.scss'],
  template: `
<!-- <pre>{{form.value | json}}</pre> -->
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
      <div>
        Title:
        <input
          type="text"
          name="title"
          required
          #title="ngModel"
          [ngModel]="detail?.title">
        <div *ngIf="title?.errors?.required && title.dirty" class="error">
          Bookmark title is required
        </div>
      </div>

      <div>
        Url:
        <input
          type="text"
          name="url"
          required
          #url="ngModel"
          [ngModel]="detail?.url">
        <div *ngIf="url?.errors?.required && url.dirty" class="error">
          Bookmark url is required
        </div>
      </div>

       <div>
        Description:
        <input
          type="text"
          name="description"
          required
          #description="ngModel"
          [ngModel]="detail?.description">
        <div *ngIf="description?.errors?.required && description.dirty" class="error">
          Bookmark description is required
        </div>
      </div>

      <div>
        <label>
        Add to favorites?
          <input
            type="checkbox"
            name="favorite"
            [ngModel]="detail?.favorite"
            (ngModelChange)="toggleFavorite($event)">
        </label>
      </div>
      <div *ngIf="form.value.favorite">
        It's favorited! Just hit update.
      </div>

      <button type="submit" [disabled]="form.invalid">
        Update bookmark
      </button>

    </form>
  `
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

  ngOnInit() {
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
