import { Component, Input } from '@angular/core';
import { Bookmark } from '../../models/bookmark.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'bookmark-card',
  styleUrls: ['bookmark-card.component.scss'],
  template: `
    <div class="bookmark-card">
        <h3><a [href]="card.url" target="_blank" rel="noopener">{{card?.title}}</a></h3>
        <p>{{card?.description}}</p>
        <p style="text-align:right; ">
          <a [routerLink]="['./view', card.id]" (click)="goToLink()" style="color: black; text-decoration:underline; font-size: 0.75rem;">
              Edit bookmark
          </a>
        </p>
    </div>
  `
})
export class BookmarkCardComponent {
  @Input()
  card: Bookmark;
  constructor(
    private router: Router
  ) { }

  goToLink() {
    this.router.navigate(['bookmarks', 'view', this.card.id])
  }


}
