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
import { NilaiMingguanService } from './nilai-mingguan.service';
import { HttpHelper } from '../helpers/http-helper';
import { Roles } from '../auth/decorator';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Role } from '@prisma/client';
import { CreatePenilaianMingguanDto } from './dto/create-nilai-mingguan.dto';
import { UpdatePenilaianMingguanDto } from './dto/update-nilai-mingguan.dto';


@Controller('nilai-mingguan')
export class NilaiMingguanController {
    constructor(
        private readonly nilaiMingguanService: NilaiMingguanService,
        private readonly httpHelper: HttpHelper
    ) { }

    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.GURU)
    @Post()
    async create(@Body() dto: CreatePenilaianMingguanDto, @Res() res, @Request() req) {
        const result = await this.nilaiMingguanService.create(req.headers.authorization, dto)
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result)
    }

    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.GURU)
    @Put(':id')
    async update(@Body() dto: UpdatePenilaianMingguanDto, @Res() res, @Request() req, @Param('id') id) {
        const result = await this.nilaiMingguanService.updateById(req.headers.authorization, id, dto)
        return this.httpHelper.formatResponse(res, HttpStatus.OK, {})
    }
}