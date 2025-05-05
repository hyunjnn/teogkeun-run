import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CertifyService } from './certify.service';
import { CreateCertifyDto } from './dto/create-certify.dto';
import { BaseResponse } from 'src/common/base.response';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { AwsService } from 'src/aws/aws.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { UploadCertifyDto } from './dto/upload-certify.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('certify')
export class CertifyController {
  constructor(
    private readonly certifyService: CertifyService,
    private readonly awsService: AwsService,
  ) {}

  // @Post()
  // async certify(
  //   @Req() req: AuthenticatedRequest,
  //   @Body() dto: CreateCertifyDto,
  // ) {
  //   const certification = await this.certifyService.createCretification(
  //     req.user.id,
  //     dto,
  //   );
  //   return new BaseResponse(true, '퇴근 인증 완료', certification);
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // form-data
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '퇴근 인증 업로드 (파일 포함)',
    type: UploadCertifyDto,
  })
  async uploadCertification(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateCertifyDto,
  ): Promise<BaseResponse> {
    const todayDraw = await this.certifyService.validateCertification(
      req.user.id,
    );

    const ext = file.mimetype.split('/')[1];
    const fileName = `${Date.now()}-${file.originalname}`;
    const s3Url = await this.awsService.imageUploadToS3(fileName, file, ext);

    const certification = await this.certifyService.createCretification(
      req.user.id,
      {
        ...dto,
        imageUrl: s3Url,
      },
      todayDraw,
    );

    return new BaseResponse(true, '퇴근 인증(파일 업로드) 완료', certification);
  }
}
