import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {
  s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY')!,
        secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY')!,
      },
    });
  }

  async imageUploadToS3(
    fileName: string,
    file: Express.Multer.File,
    ext: string, // 파일 확장자
  ): Promise<string> {
    // 파일 이름, 파일 버퍼, 파일 접근 권한, 파일 타입 등을 설정하는 명령어 작성
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: fileName,
      Body: file.buffer,
      // ACL: 'public-read', // 파일 접근 권한
      ContentType: `image/${ext}`,
    });

    // 작성된 명령을 전달하여 이미지 업로드 수행
    await this.s3Client.send(command);

    // 업로드된 이미지의 URL 반환
    return `https://${this.configService.get('AWS_S3_BUCKET_NAME')}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileName}`;
  }
}
