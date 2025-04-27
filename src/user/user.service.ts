import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(
    email: string,
    password: string,
    nickname: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.prisma.user.create({
      data: { email, password: hashedPassword, nickname },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(userId: string): Promise<User> {
    const userProfile = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userProfile) {
      throw new NotFoundException('프로필을 찾지 못했습니다.');
    }

    return userProfile;
  }
}
