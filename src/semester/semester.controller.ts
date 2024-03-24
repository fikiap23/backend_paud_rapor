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
import { HttpHelper } from '../helpers/http-helper';
import { SemesterService } from './semester.service';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';
import { Role } from '@prisma/client';
import { CreateSemesterDto } from './dto/create-semester.dto';


@Controller('semester')
export class SemesterController {
    constructor(
        private readonly semesterService: SemesterService,
        private readonly httpHelper: HttpHelper
    ) { }

    @Post()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.ADMIN)
    async create(@Body() dto: CreateSemesterDto, @Res() res) {
        const result = await this.semesterService.create(dto);
        return this.httpHelper.formatResponse(res, HttpStatus.CREATED, result);
    }
}