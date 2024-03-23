import {
    Body,
    Controller,
    Get,
    Put,
    HttpStatus,
    Param,
    Post,
    Res,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator';
import CreateGuruDto from './dto/create-guru.dto';
import { GuruService } from './guru.service';
import { HttpHelper } from '../helpers/http-helper';


@Controller('guru')
export class GuruController {
    constructor(private readonly guruService: GuruService, private readonly httpHelper: HttpHelper) { }

    @Post()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async create(@Body() dto: CreateGuruDto, @Res() res) {
        await this.guruService.create(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, {});
    }
}