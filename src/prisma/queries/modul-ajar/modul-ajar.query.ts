import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import CreateModulAjarDto from '../../../modul-ajar/dto/create-modul-ajar.dto';

@Injectable()
export class ModulAjarQuery extends DbService {
    async findAll() {
        return await this.prisma.modulAjar.findMany()
    }

    async findById(id: string) {
        return await this.prisma.modulAjar.findUnique({ where: { id } })
    }

    async checkIsMingguHasUsed(minggu: number, idMapel: string, idRombel: string): Promise<boolean> {
        const isMingguHasUsed = await this.prisma.modulAjar.findFirst({ where: { minggu, idMapel, idRombel } })
        return isMingguHasUsed ? true : false
    }

    async create(payload: CreateModulAjarDto) {
        return await this.prisma.modulAjar.create({ data: payload })
    }
}