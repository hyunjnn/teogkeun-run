import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadCertifyDto {
  @ApiProperty({ type: 'string', description: '지하철' })
  @IsString()
  tag: string[];

  @ApiProperty({ type: 'string', format: 'binary', description: '이미지 파일' })
  file: any;
}
