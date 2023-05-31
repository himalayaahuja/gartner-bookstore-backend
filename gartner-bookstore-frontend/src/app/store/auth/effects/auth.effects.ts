import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, map, tap, concatMap } from 'rxjs/operators';
import { AppState } from '../..';
import { AuthService } from '../services/auth.service';
import * as fromAuth from '../actions/auth.actions';
import { User } from '../models/auth-user.model';
import { CartItem } from '../models/cart-item.dto';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private store: Store<AppState>, private authService: AuthService) { }

  setInitialUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAuth.SetInitialUser>(fromAuth.AuthActions.SET_INITIAL_USER),
      mergeMap((action: fromAuth.SetInitialUser) =>
        this.authService.whoami().pipe(
          map((user: User) => new fromAuth.SetCurrentUser(user)),
          catchError((err) => {
            this.store.dispatch(new fromAuth.SetCurrentUser(null));
            this.authService.token = null;
            return of(new fromAuth.SetAuthError(err));
          }),
        ),
      ),
    ),
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAuth.LoginUser>(fromAuth.AuthActions.LOGIN_USER),
      mergeMap((action: fromAuth.LoginUser) =>
        this.authService.auth(action.payload).pipe(
          map((user: User) => new fromAuth.SetCurrentUser(user)),
          catchError((err) => {
            this.store.dispatch(new fromAuth.SetCurrentUser(null));
            this.authService.token = null;
            return of(new fromAuth.SetAuthError(err));
          }),
        ),
      ),
    ),
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAuth.AddToCart>(fromAuth.AuthActions.ADD_TO_CART),
      mergeMap((action: fromAuth.AddToCart) =>
        this.authService.addToCart(action.payload).pipe(
          map((cart: CartItem[]) => new fromAuth.AddToCartSuccess(cart)),
          catchError((err) => {
            return of(new fromAuth.AddToCartError(err));
          }),
        ),
      ),
    ),
  );
}
