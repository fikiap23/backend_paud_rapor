import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { GuruModule } from './guru/guru.module';
import { UserModule } from './user/user.module';
import { RombelModule } from './rombel/rombel.module';
import { MuridModule } from './murid/murid.module';
import { MapelModule } from './mapel/mapel.module';
import { ModulAjarModule } from './modul-ajar/modul-ajar.module';


@Module({
  imports: [AuthModule, PrismaModule, GuruModule, UserModule, RombelModule, MuridModule, MapelModule, ModulAjarModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
