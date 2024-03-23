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
import CreateMapelDto from './dto/create-mapel.dto';
import { MapelService } from './mapel.service';
import { HttpHelper } from '../helpers/http-helper';


@Controller('mapel')
export class MapelController {
    constructor(private readonly mapelService: MapelService, private readonly httpHelper: HttpHelper) { }

    @Post()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async create(@Body() dto: CreateMapelDto, @Res() res) {
        const result = await this.mapelService.create(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }
}