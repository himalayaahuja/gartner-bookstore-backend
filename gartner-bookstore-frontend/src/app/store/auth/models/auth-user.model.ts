import { CartItem } from './cart-item.dto';

export interface User {

  readonly _id: number;

  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  readonly cart: CartItem[];
}
