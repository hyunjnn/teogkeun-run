import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CertifyService } from './certify.service';
import { CreateCertifyDto } from './dto/create-certify.dto';
import { BaseResponse } from 'src/common/base.response';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('certify')
export class CertifyController {
  constructor(private readonly certifyService: CertifyService) {}

  @Post()
  async certify(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateCertifyDto,
  ): Promise<BaseResponse> {
    const certification = await this.certifyService.createCretification(
      req.user.id,
      dto,
    );
    return new BaseResponse(true, '퇴근 인증 완료', certification);
  }
}
