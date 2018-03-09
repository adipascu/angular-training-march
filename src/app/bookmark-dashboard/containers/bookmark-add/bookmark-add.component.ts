import { Component } from '@angular/core';
import { Bookmark } from '../../models/bookmark.interface';

import { BookmarkDashboardService } from '../../bookmark-dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bookmark-add',
  styleUrls: ['bookmark-add.component.scss'],
  template: `
    <div class="centered">
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
      <div>
        Title:
        <input
          type="text"
          name="title"
          required
          #title="ngModel"
          [ngModel]="detail?.title">
        <div *ngIf="title?.errors?.required && title?.dirty && title?.touched" class="error">
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
          [ngModel]="detail?.url"
          isUrl>
         <div *ngIf="url?.errors?.required && url?.dirty && url?.errors?.isNotUrl && url?.touched" class="error">
          Please enter a valid url (include http/https)
        </div>
      </div>
      <button type="submit" [disabled]="form.invalid">
        Add new bookmark
      </button>
    </form>
    <div>
  `
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
          this.router.navigate(['/bookmarks'])
        }, 1000);
      })
  }


  isUrl(value: string): boolean {
    console.log(value);
    return (value.includes('http')) ? true : false;
  }
}
