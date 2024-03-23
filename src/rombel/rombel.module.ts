import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MomentModule } from '@ccmos/nestjs-moment';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperModule } from '../helpers/helper.module';
import { RombelService } from './rombel.service';
import { RombelRepository } from './rombel.repository';
import { RombelQuery } from '../prisma/queries/rombel/rombel.query';
import { RombelController } from './rombel.controller';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({}),
        MomentModule,
        ConfigModule,
        HelperModule,
    ],
    providers: [RombelService, RombelRepository, RombelQuery],
    controllers: [RombelController],
    exports: [RombelService, RombelRepository],
})
export class RombelModule { }