import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  styleUrls: ['nav.component.scss'],
  template: `
  <nav class="nav">
    <a *ngFor="let item of navigation"
      [title]="item.title"
      [routerLink]="item.link"
      routerLinkActive="active"
      [routerLinkActiveOptions]="{exact: item.exact}">
      {{item.name}}
    </a>
  </nav>
  `
})
export class NavComponent {

  navigation: Nav[] = [
    {
      link: '/home',
      name: 'Home',
      exact: true,
      title: 'Something'
    },
    {
      link: '/bookmarks',
      name: 'Bookmarks',
      exact: true,
      title: null
    },
    {
      link: '/bookmarks/add-new',
      name: 'Quick add',
      exact: true,
      title: null
    }
  ];
  constructor() {}
}

interface Nav {
  link: string;
  name: string;
  exact: boolean;
  order?: number | 0;
  title: string | null;
}
