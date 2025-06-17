import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthbackendModule } from './authbackend.module';
import { ServicesModule } from './services/services.module';
import { LoggerMiddleware } from './services/LoggerMiddleware';
import { JwtStrategy } from '@public-services-platform/auth';

@Module({
  imports: [
    AuthbackendModule,
    ServicesModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Log all routes
  }
}
