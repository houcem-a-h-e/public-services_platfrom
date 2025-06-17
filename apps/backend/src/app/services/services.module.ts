import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { AuthModule } from '@public-services-platform/auth';

@Module({
   imports: [AuthModule],  
  controllers: [ServicesController],
  
})
export class ServicesModule {}
