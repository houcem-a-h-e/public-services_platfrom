import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthbackendModule } from './authbackend.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    AuthbackendModule,
    ServicesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
