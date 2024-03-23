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
import { Roles } from '../auth/decorator';
import { Role } from '@prisma/client';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { CreateRombelDto } from './dto/create-rombel.dto';
import { RombelService } from './rombel.service';
import { HttpHelper } from '../helpers/http-helper';
import { CreateKategoriRombelDto } from './dto/create-kategori-rombel.dto';


@Controller('rombel')
export class RombelController {
    constructor(private readonly rombelService: RombelService, private readonly httpHelper: HttpHelper) { }

    /*
    |--------------------------------------------------------------------------
    | Rombel Endpoints
    |--------------------------------------------------------------------------
  */
    @Post()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async create(@Body() dto: CreateRombelDto, @Res() res) {
        const result = await this.rombelService.createRombel(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }



    /*
    |--------------------------------------------------------------------------
    | Kategori Rombel Endpoints
    |--------------------------------------------------------------------------
    */

    @Post('kategori')
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async createKategori(@Body() dto: CreateKategoriRombelDto, @Res() res) {
        const result = await this.rombelService.createKategoriRombel(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }
}