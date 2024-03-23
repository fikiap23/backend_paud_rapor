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
import { Roles } from '../auth/decorator';
import { Role } from '@prisma/client';
import { MuridService } from './murid.service';
import CreateMuridDto from './dto/create-murid.dto';
import { HttpHelper } from '../helpers/http-helper';


@Controller('murid')
export class MuridController {
    constructor(private readonly muridService: MuridService, private readonly httpHelper: HttpHelper) { }

    @Post()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async create(@Body() dto: CreateMuridDto, @Res() res) {
        const result = await this.muridService.create(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }
}