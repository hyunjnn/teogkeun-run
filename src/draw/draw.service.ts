import { Injectable } from '@nestjs/common';
import { Draw } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class DrawService {
  constructor(private readonly prisma: PrismaService) {}

  async createDraw(userId: string): Promise<Draw> {
    const randomTime = this.generateRandomTime();
    return await this.prisma.draw.create({
      data: {
        userId,
        date: new Date(),
        drawnTime: randomTime,
      },
    });
  }

  async findTodayDraw(userId: string): Promise<Draw | null> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await this.prisma.draw.findFirst({
      where: {
        userId,
        date: {
          gte: today, // greater than or equal
          lt: tomorrow, // less than
        },
      },
    });
  }

  async findAllDrawsByUser(userId: string): Promise<Draw[]> {
    return await this.prisma.draw.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  private generateRandomTime(): string {
    const randomMinutes = this.generateRandomMinutes();
    return this.formatMinutesToTime(randomMinutes);
  }

  private generateRandomMinutes(): number {
    const startMinutes = 17 * 60;
    const endMinutes = 22 * 60;
    return (
      Math.floor(Math.random() * (endMinutes - startMinutes + 1)) + startMinutes
    );
  }

  private formatMinutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(mins).padStart(2, '0');
    return `${paddedHours}:${paddedMinutes}`;
  }
}
