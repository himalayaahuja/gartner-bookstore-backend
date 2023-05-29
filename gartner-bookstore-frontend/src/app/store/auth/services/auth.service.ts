// tslint:disable: max-line-length
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthDTO } from '../models/auth.model';
import { User } from '../models/auth-user.model';
import { LoginResponse } from '../models/login-res.model';
import { ROUTE_LOGIN } from 'src/app/app.routes';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.apiUrl + '/api/v1';

  constructor(private http: HttpClient) { }

  auth(data: AuthDTO): Observable<User> {
    return this.http.post<LoginResponse>(`${this.api}/users/login`, data).pipe(
      mergeMap((res: LoginResponse) => {
        this.token = res.auth.access_token;
        this.userId = res.user._id;
        return of(res.user);
      })
    );
  }

  whoami(): Observable<User> {
    return this.http.get<User>(`${this.api}/users/me`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }

  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  set token(val: string | null) {
    if (val) {
      localStorage.setItem('access_token', val);
    } else {
      localStorage.clear();
    }
  }

  get userId(): number | null {
    return Number(localStorage.getItem('user_id'));
  }

  set userId(val: number | null) {
    if (val) {
      localStorage.setItem('user_id', `${val}`);
    } else {
      localStorage.clear();
    }
  }
}
