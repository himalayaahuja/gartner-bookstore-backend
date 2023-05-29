import { User } from '../schemas/user.schema';
import { AccessTokenDto } from './access-token.dto';

export class UserAuthDto {
  user: User;

  auth: AccessTokenDto;
}
