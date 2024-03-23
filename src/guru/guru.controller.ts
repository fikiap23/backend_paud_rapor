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
    Req,
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
        const result = await this.guruService.create(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }

    @Put('bypass/status/:id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async updateStatusByAdmin(@Param('id') id: string, @Body() dto: CreateGuruDto, @Res() res) {
        const result = await this.guruService.updateByAdmin(id, dto);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Put('bypass/:id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async updateByAdmin(@Param('id') id: string, @Body() dto: CreateGuruDto, @Res() res) {
        const result = await this.guruService.updateByAdmin(id, dto);
        return this.httpHelper.formatResponse(res, HttpStatus.OK, result);
    }

    @Put(':id')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.GURU)
    async update(@Param('id') id: string, @Body() dto: CreateGuruDto, @Res() res, @Req() req) {

    }


}