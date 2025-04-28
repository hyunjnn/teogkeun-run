import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateCertifyDto } from './dto/create-certify.dto';
import { DrawService } from 'src/draw/draw.service';
import { Certification } from '@prisma/client';

@Injectable()
export class CertifyService {
  constructor(
    private prisma: PrismaService,
    private drawService: DrawService,
  ) {}

  async createCretification(
    userId: string,
    dto: CreateCertifyDto,
  ): Promise<Certification> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await this.prisma.certification.findFirst({
      where: {
        userId,
        createdAt: {
          gte: today,
        },
      },
    });

    if (existing) {
      throw new ConflictException('오늘은 이미 퇴근 인증을 완료했습니다.');
    }

    const todayDraw = await this.drawService.findTodayDraw(userId);

    if (!todayDraw) {
      throw new ConflictException('오늘의 퇴근 운세를 뽑지 않았습니다.');
    }

    const certification = await this.prisma.certification.create({
      data: {
        userId,
        tag: dto.tag,
        imageUrl: dto.imageUrl ?? null,
        date: today,
        drawnTime: todayDraw.drawnTime,
      },
    });

    return certification;
  }
}
