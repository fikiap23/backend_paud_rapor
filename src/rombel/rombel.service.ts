import { Injectable } from '@nestjs/common';
import { RombelRepository } from './rombel.repository';
import { CreateRombelDto } from './dto/create-rombel.dto';
import { CreateKategoriRombelDto } from './dto/create-kategori-rombel.dto';
import { UpdatKategoriRombelDto } from './dto/update-kategori-rombel.dto';

@Injectable()
export class RombelService {
    constructor(private readonly rombelRepository: RombelRepository) { }

    async createRombel(dto: CreateRombelDto) {
        return await this.rombelRepository.createRombel(dto)
    }

    /*
    |--------------------------------------------------------------------------
    | Kategori Rombel Service
    |--------------------------------------------------------------------------
    */
    async createKategoriRombel(dto: CreateKategoriRombelDto) {
        return await this.rombelRepository.createKategoriRombel(dto)
    }

    async updateKategoriRombel(id: string, dto: UpdatKategoriRombelDto) {
        return await this.rombelRepository.updateKategoriRombel(id, dto)
    }
}