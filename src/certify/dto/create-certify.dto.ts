import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateCertifyDto {
  @IsArray()
  @IsString({ each: true })
  tag: string[];

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
