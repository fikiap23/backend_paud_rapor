import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import { CreateRombelDto } from '../../../rombel/dto/create-rombel.dto';
import { CreateKategoriRombelDto } from '../../../rombel/dto/create-kategori-rombel.dto';



@Injectable()
export class RombelQuery extends DbService {

    async create(payload: CreateRombelDto, kode: string) {
        return await this.prisma.rombel.create({ data: { ...payload, kode } })
    }

    async findByKode(kode: string) {
        return await this.prisma.rombel.findUnique({ where: { kode } })
    }


    /*
    |--------------------------------------------------------------------------
    | Kategori Rombel Query
    |--------------------------------------------------------------------------
    */

    async findKategoriRombelByKode(kode: string) {
        return await this.prisma.kategoriRombel.findUnique({ where: { kode } })
    }

    async findKategoriRombelById(id: string) {
        return await this.prisma.kategoriRombel.findUnique({ where: { id } })
    }

    async createKategoriRombel(payload: CreateKategoriRombelDto) {
        return await this.prisma.kategoriRombel.create({ data: payload })
    }
}