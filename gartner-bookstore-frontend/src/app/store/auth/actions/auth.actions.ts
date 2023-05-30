import { Action } from '@ngrx/store';
import { User } from '../models/auth-user.model';
import { AuthDTO } from '../models/auth.model';

export enum AuthActions {
  LOGIN_USER = '[AUTH] Login user',
  SET_INITIAL_USER = '[AUTH] Set initial user',
  SET_CURRENT_USER = '[AUTH] Set current user',
  SET_AUTH_ERROR = '[Auth] Set auth error',
}

export class LoginUser implements Action {
  readonly type = AuthActions.LOGIN_USER;
  constructor(public payload: AuthDTO) {}
}

export class SetInitialUser implements Action {
  readonly type = AuthActions.SET_INITIAL_USER;
}

export class SetCurrentUser implements Action {
  readonly type = AuthActions.SET_CURRENT_USER;
  constructor(public payload: User | null) {}
}

export class SetAuthError implements Action {
  readonly type = AuthActions.SET_AUTH_ERROR;
  constructor(public payload?: any) {}
}

export type AuthAction = LoginUser | SetCurrentUser | SetInitialUser | SetAuthError;
