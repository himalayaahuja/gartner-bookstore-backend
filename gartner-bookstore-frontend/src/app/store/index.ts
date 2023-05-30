import { AuthEffects } from './auth/effects/auth.effects';
import { AuthReducer, AuthState } from './auth/reducers/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    readonly auth: AuthState;
}

export const effects = [AuthEffects];

export const reducers: ActionReducerMap<AppState> = {
  auth: AuthReducer,
};
