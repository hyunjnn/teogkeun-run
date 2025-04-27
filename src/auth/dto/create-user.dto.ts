import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'kk@gmail.com' })
  @IsEmail()
  email: string;

  password: string;

  @IsString()
  nickname: string;
}
