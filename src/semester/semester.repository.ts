import { BadRequestException, Injectable } from '@nestjs/common';
import { SemesterQuery } from '../prisma/queries/semester/semester.query.dto';
import { CreateSemesterDto } from './dto/create-semester.dto';

@Injectable()
export class SemesterRepository {
    constructor(private readonly semesterQuery: SemesterQuery) { }

    async findAll() {
        return await this.semesterQuery.findAll();
    }

    async findByIdOrThrow(id: string) {
        const semester = await this.semesterQuery.findById(id);
        if (!semester) throw new BadRequestException('Semester tidak ditemukan');
        return semester
    }

    async create(payload: CreateSemesterDto) {
        return await this.semesterQuery.create(payload);
    }

}