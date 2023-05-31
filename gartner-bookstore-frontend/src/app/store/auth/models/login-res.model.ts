import { User } from './auth-user.model';

export interface LoginResponse {
  user: User;
  auth: { access_token: string };
}
