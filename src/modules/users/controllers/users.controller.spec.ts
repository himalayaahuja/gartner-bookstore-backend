import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { AuthService } from '../../auth/services/auth.service';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsersService = {};
  const mockAuthService = {};


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, AuthService],
    }).overrideProvider(UsersService).useValue(mockUsersService)
      .overrideProvider(AuthService).useValue(mockAuthService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
