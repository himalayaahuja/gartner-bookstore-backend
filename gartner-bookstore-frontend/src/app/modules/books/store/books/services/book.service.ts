// tslint:disable: max-line-length
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/store/auth/services/auth.service';
import { User } from 'src/app/store/auth/models/auth-user.model';
import { Filters } from '../models/filters.model';
import { BookListing } from '../models/books-listing.model';

@Injectable()
export class BookService {
  private api: string = environment.apiUrl + '/api/v1';
  private requestType = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
    PATCH: 'PATCH',
  };

  constructor(private http: HttpClient, private auth: AuthService) { }

  private request(method: string, endpoint: string, body?: any, responseType?: any): Observable<any> {
    const url = `${this.api}/${endpoint}`;
    return this.http.request(method, url, {
      body,
      responseType: responseType ? responseType : 'json',
      // headers: { authorization: `Bearer ${this.auth.token}` },
      headers: { 'x-api-key': environment.apiKey },
    });
  }

  fetchBooks(page: number | undefined, filters: Filters | undefined): Observable<BookListing> {
    const endpoint = filters
      ? `books?page=${page}&searchQuery=${filters?.searchQuery}&priceRangeFrom=${filters?.priceRangeFrom}&priceRangeTo=${filters?.priceRangeTo}&ratingMin=${filters?.ratingMin}`
      : `books?page=${page}`;
    return this.request(this.requestType.GET, endpoint);
  }
}
