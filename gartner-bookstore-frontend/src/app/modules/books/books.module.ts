import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/books/books.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { BookService } from './store/books/services/book.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { bookReducer } from './store/books/reducers/book.reducer';
import { BookEffects } from './store/books/effects/book.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSliderModule } from 'ngx-slider-v2';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes = [
  {
    path: '',
    component: BooksComponent,
  },
];

@NgModule({
  declarations: [BooksComponent],
  providers: [BookService],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('books', bookReducer),
    EffectsModule.forFeature([BookEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    NgxSliderModule,
  ],
})
export class BooksModule { }
