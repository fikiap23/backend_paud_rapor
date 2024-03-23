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
    Request,
} from '@nestjs/common';
import { JadwalAjarService } from './jadwal-ajar.service';
import { HttpHelper } from '../helpers/http-helper';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';
import { Role } from '@prisma/client';
import { CreateJadwalAjarDto } from './dto/create-jadwal-ajar.dto';
import { UpdateJadwalAjarDto } from './dto/update-jadwal-ajar.dto';


@Controller('jadwal-ajar')
export class JadwalAjarController {
    constructor(
        private readonly jadwalAjarService: JadwalAjarService,
        private readonly httpHelper: HttpHelper
    ) { }

    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.GURU)
    @Post()
    async create(@Body() dto: CreateJadwalAjarDto, @Res() res, @Request() req) {
        const result = await this.jadwalAjarService.createJadwalAjar(req.headers.authorization, dto)
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result)
    }

    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.GURU)
    @Put(':id')
    async update(@Body() dto: UpdateJadwalAjarDto, @Res() res, @Request() req, @Param('id') id) {
        await this.jadwalAjarService.updateById(req.headers.authorization, id, dto)
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {})
    }
}