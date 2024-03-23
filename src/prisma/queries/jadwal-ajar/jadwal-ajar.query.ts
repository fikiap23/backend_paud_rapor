import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';

@Injectable()
export class JadwalAjarQuery extends DbService {

    async findAll() {
        return await this.prisma.jadwalAjar.findMany()
    }

    async findById(id: string) {
        return await this.prisma.jadwalAjar.findUnique({ where: { id } })
    }
}