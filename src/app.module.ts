import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DrawModule } from './draw/draw.module';
import { CertifyModule } from './certify/certify.module';
import { TeamModule } from './team/team.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DrawModule,
    CertifyModule,
    TeamModule,
    ReportModule,
  ],
})
export class AppModule {}
