import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreatePenilaianMingguanDto } from '../../../nilai-mingguan/dto/create-nilai-mingguan.dto';

@Injectable()
export class NilaiMingguanQuery extends DbService {

    async findAll() {
        return await this.prisma.penilaianMingguan.findMany()
    }

    async findById(id: string) {
        return await this.prisma.penilaianMingguan.findUnique({ where: { id } })
    }

    async findByIdAndIdModulAjarAndIdMurid(id: string, idModulAjar: string, idMurid: string) {
        return await this.prisma.penilaianMingguan.findUnique({ where: { id, idModulAjar, idMurid } })
    }

    async create(payload: CreatePenilaianMingguanDto) {
        return await this.prisma.penilaianMingguan.create({ data: payload })
    }
}