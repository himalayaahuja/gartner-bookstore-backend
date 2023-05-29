import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/books/books.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: BooksComponent,
  },
];

@NgModule({
  declarations: [BooksComponent],
  imports: [CommonModule, NgxSpinnerModule, RouterModule.forChild(routes)],
})
export class BooksModule {}
