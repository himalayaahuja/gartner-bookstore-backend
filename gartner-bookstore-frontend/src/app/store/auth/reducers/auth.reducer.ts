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

    case AuthActions.ADD_TO_CART:
      return { ...state, loading: true, error: null };

    case AuthActions.ADD_TO_CART_SUCCESS:
      const updatedUser: any = { ...state.user };
      updatedUser.cart = specificAction.payload;
      return { user: updatedUser, loading: false, error: null };

    case AuthActions.ADD_TO_CART_ERROR:
      return { ...state, loading: false, error: specificAction.payload };

    default:
      return state;
  }
}
