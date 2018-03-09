import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers
import { BookmarkDashboardComponent } from './containers/bookmark-dashboard/bookmark-dashboard.component';
import { BookmarkViewerComponent } from './containers/bookmark-viewer/bookmark-viewer.component';
import { BookmarkAddComponent } from './containers/bookmark-add/bookmark-add.component';

// components
import { BookmarkCountComponent } from './components/bookmark-count/bookmark-count.component';
import { BookmarkDetailComponent } from './components/bookmark-detail/bookmark-detail.component';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';
import { BookmarkCardComponent } from './components/bookmark-card/bookmark-card.component';

// service
import { BookmarkDashboardService } from './bookmark-dashboard.service';
import { IsUrlValidator } from './containers/bookmark-add/is-url.directive';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: BookmarkDashboardComponent },
      { path: 'view/:id', component: BookmarkViewerComponent },
      { path: 'add-new', component: BookmarkAddComponent }
    ]
  }
];

@NgModule({
  declarations: [
    BookmarkDashboardComponent,
    BookmarkViewerComponent,
    BookmarkAddComponent,
    BookmarkCountComponent,
    BookmarkDetailComponent,
    BookmarkCardComponent,
    BookmarkFormComponent,
    IsUrlValidator
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    BookmarkDashboardService
  ]
})
export class BookmarkDashboardModule { }
