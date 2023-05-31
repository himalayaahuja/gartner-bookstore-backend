import { Action } from '@ngrx/store';
import { User } from '../models/auth-user.model';
import { AuthDTO } from '../models/auth.model';
import { AddToCartDto } from '../models/add-to-cart.dto';
import { CartItem } from '../models/cart-item.dto';

export enum AuthActions {
  LOGIN_USER = '[AUTH] Login user',
  SET_INITIAL_USER = '[AUTH] Set initial user',
  SET_CURRENT_USER = '[AUTH] Set current user',
  SET_AUTH_ERROR = '[Auth] Set auth error',
  ADD_TO_CART = '[User] Add to cart',
  ADD_TO_CART_SUCCESS = '[User] Add to cart success',
  ADD_TO_CART_ERROR = '[User] Set add to cart error',

}

export class LoginUser implements Action {
  readonly type = AuthActions.LOGIN_USER;
  constructor(public payload: AuthDTO) { }
}

export class AddToCart implements Action {
  readonly type = AuthActions.ADD_TO_CART;
  constructor(public payload: AddToCartDto) { }
}

export class AddToCartSuccess implements Action {
  readonly type = AuthActions.ADD_TO_CART_SUCCESS;
  constructor(public payload: CartItem[]) { }
}

export class AddToCartError implements Action {
  readonly type = AuthActions.ADD_TO_CART_ERROR;
  constructor(public payload?: any) { }
}

export class SetInitialUser implements Action {
  readonly type = AuthActions.SET_INITIAL_USER;
}

export class SetCurrentUser implements Action {
  readonly type = AuthActions.SET_CURRENT_USER;
  constructor(public payload: User | null) { }
}

export class SetAuthError implements Action {
  readonly type = AuthActions.SET_AUTH_ERROR;
  constructor(public payload?: any) { }
}

export type AuthAction = LoginUser | SetCurrentUser | SetInitialUser | SetAuthError | AddToCart | AddToCartSuccess | AddToCartError;
