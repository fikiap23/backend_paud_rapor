import { BadRequestException, Injectable } from '@nestjs/common';
import { RombelQuery } from '../prisma/queries/rombel/rombel.query';
import { CreateRombelDto } from './dto/create-rombel.dto';
import { GuruRepository } from '../guru/guru.repository';
import { CreateKategoriRombelDto } from './dto/create-kategori-rombel.dto';

@Injectable()
export class RombelRepository {
    constructor(private readonly rombelQuery: RombelQuery, private readonly guruRepository: GuruRepository) { }

    async createRombel(dto: CreateRombelDto) {
        if (dto.idGuru) {
            // check guru exist
            await this.guruRepository.findGuruByIdOrThrow(dto.idGuru);
        }
        const kategoriRombel = await this.findKategoriRombelOrThrowById(dto.idKategoriRombel)

        // custom kode
        const kode = `${kategoriRombel.kode}${dto.tingkatan}`
        await this.checkKodeExist(kode)

        return await this.rombelQuery.create(dto, kode)
    }

    async findByKodeOrThrow(kode: string) {
        const rombel = await this.rombelQuery.findByKode(kode);
        if (!rombel) throw new BadRequestException('Rombel tidak ditemukan');
        return rombel
    }

    async checkKodeExist(kode: string) {
        const rombel = await this.rombelQuery.findByKode(kode);
        if (rombel) throw new BadRequestException('Kode Rombel/Kode sudah ada');
        return
    }

    /*
    |--------------------------------------------------------------------------
    | Kategori Rombel FUNCTIONS
    |--------------------------------------------------------------------------
    */

    async findKategoriRombelOrThrowByKode(kode: string) {
        const rombel = await this.rombelQuery.findKategoriRombelByKode(kode);
        if (!rombel) throw new BadRequestException('Kategori Rombel tidak ditemukan');
        return rombel
    }

    async checkKategoriRombelExistByKode(kode: string) {
        const rombel = await this.rombelQuery.findKategoriRombelByKode(kode);
        if (rombel) throw new BadRequestException('Kode Kategori Rombel sudah ada');
        return
    }

    async findKategoriRombelOrThrowById(id: string) {
        const rombel = await this.rombelQuery.findKategoriRombelById(id);
        if (!rombel) throw new BadRequestException('Kategori Rombel tidak ditemukan');
        return rombel
    }

    async checkKategoriRombelExistById(id: string) {
        const rombel = await this.rombelQuery.findKategoriRombelById(id);
        if (rombel) throw new BadRequestException('Id Kategori Rombel sudah ada');
        return
    }

    async createKategoriRombel(dto: CreateKategoriRombelDto) {
        // check kategori rombel exist
        await this.checkKategoriRombelExistByKode(dto.kode);
        return await this.rombelQuery.createKategoriRombel(dto)
    }
}