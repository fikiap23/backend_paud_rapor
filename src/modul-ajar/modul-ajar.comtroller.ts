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
import { HttpHelper } from '../helpers/http-helper';
import { ModulAjarService } from './modul-ajar.service';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator';
import CreateModulAjarDto from './dto/create-modul-ajar.dto';


@Controller('modul-ajar')
export class ModulAjarController {
    constructor(private readonly modulAjarService: ModulAjarService, private readonly httpHelper: HttpHelper) { }

    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.GURU)
    @Post()
    async create(@Body() dto: CreateModulAjarDto, @Res() res, @Request() req) {
        const result = await this.modulAjarService.createModulAjar(req.headers.authorization, dto)
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result)
    }
}