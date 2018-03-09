import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  styleUrls: ['nav.component.scss'],
  template: `
  <nav class="nav">
    <a *ngFor="let item of nav" [routerLink]="item.link" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: item.exact }">
      {{ item.name }}
    </a>
  </nav>

  `
})
export class NavComponent {

  nav: Nav[] = [
    {
      link: '/',
      name: 'Home',
      exact: true
    },
    {
      link: '/bookmarks',
      name: 'Bookmarks',
      exact: true
    },
    {
      link: '/bookmarks/add-new',
      name: 'Quick add',
      exact: true
    }
  ];
  constructor() {}
}

interface Nav {
  link: string,
  name: string,
  exact: boolean
}
