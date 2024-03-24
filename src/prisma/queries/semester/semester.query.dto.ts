import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateSemesterDto } from '../../../semester/dto/create-semester.dto';

@Injectable()
export class SemesterQuery extends DbService {

    async findAll() {
        return await this.prisma.semester.findMany()
    }

    async findById(id: string) {
        return await this.prisma.semester.findUnique({ where: { id } })
    }

    async create(payload: CreateSemesterDto) {
        return await this.prisma.semester.create({ data: payload })
    }
}