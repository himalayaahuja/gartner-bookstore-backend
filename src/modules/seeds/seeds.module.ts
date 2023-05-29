import { Module } from '@nestjs/common';
import { UsersSeed } from './users/users.seed';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [UsersSeed],
})
export class SeedsModule {}
