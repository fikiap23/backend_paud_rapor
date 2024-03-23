import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { GuruModule } from './guru/guru.module';
import { UserModule } from './user/user.module';
import { RombelModule } from './rombel/rombel.module';


@Module({
  imports: [AuthModule, PrismaModule, GuruModule, UserModule, RombelModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
