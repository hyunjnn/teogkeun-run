import { Module } from '@nestjs/common';
import { CertifyController } from './certify.controller';
import { CertifyService } from './certify.service';
import { CommonModule } from 'src/common/common.module';
import { DrawModule } from 'src/draw/draw.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [CommonModule, DrawModule, AwsModule],
  controllers: [CertifyController],
  providers: [CertifyService],
})
export class CertifyModule {}
