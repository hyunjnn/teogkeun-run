import { Module } from '@nestjs/common';
import { CertifyController } from './certify.controller';
import { CertifyService } from './certify.service';
import { CommonModule } from 'src/common/common.module';
import { DrawModule } from 'src/draw/draw.module';

@Module({
  imports: [CommonModule, DrawModule],
  controllers: [CertifyController],
  providers: [CertifyService],
})
export class CertifyModule {}
