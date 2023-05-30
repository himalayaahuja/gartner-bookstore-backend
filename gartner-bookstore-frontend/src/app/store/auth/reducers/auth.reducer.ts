import { Action } from '@ngrx/store';
import { AuthAction, AuthActions } from '../actions/auth.actions';
import { User } from '../models/auth-user.model';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: any;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export function AuthReducer(state: AuthState = initialState, action: Action): AuthState {
  const specificAction = action as AuthAction;
  switch (specificAction.type) {
    case AuthActions.LOGIN_USER:
      return { ...state, loading: true, error: null };

    case AuthActions.SET_INITIAL_USER:
      return { ...state, loading: true, error: null };

    case AuthActions.SET_CURRENT_USER:
      return { user: specificAction.payload, loading: false, error: null };

    case AuthActions.SET_AUTH_ERROR:
      return { ...state, loading: false, error: specificAction.payload };

    default:
      return state;
  }
}
