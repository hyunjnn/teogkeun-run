import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CommonModule } from 'src/common/common.module';
import { UserController } from './user.controller';

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
