import { Module } from '@nestjs/common';
import { AuthModule } from '@public-services-platform/auth';
import { RolesGuard } from '@public-services-platform/auth';

@Module({
  imports: [AuthModule],
  providers: [RolesGuard],
  exports: [AuthModule, RolesGuard]
})
export class AuthbackendModule {}
