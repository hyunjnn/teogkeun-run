import { Module } from '@nestjs/common';
import { DrawService } from './draw.service';
import { DrawController } from './draw.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [DrawService],
  controllers: [DrawController],
  exports: [DrawService],
})
export class DrawModule {}
