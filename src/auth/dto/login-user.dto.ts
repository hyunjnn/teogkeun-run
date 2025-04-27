import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'kk@gmail.com' })
  @IsEmail()
  email: string;

  password: string;
}
