import { BadRequestException, Injectable } from '@nestjs/common';
import { MuridQuery } from '../prisma/queries/murid/murid.query';
import CreateMuridDto from './dto/create-murid.dto';


@Injectable()
export class MuridRepository {
    constructor(private readonly muridQuery: MuridQuery) { }

    async findByIdOrThrow(id: string) {
        const murid = await this.muridQuery.findById(id);
        if (!murid) {
            throw new Error('Anak belum terdaftar');
        }
        return murid;
    }

    async findByNisOrThrow(nis: string) {
        const murid = await this.muridQuery.findByNis(nis);
        if (!murid) {
            throw new Error('Anak belum terdaftar');
        }
        return murid;
    }

    async findByNisnOrThrow(nisn: string) {
        const murid = await this.muridQuery.findByNisn(nisn);
        if (!murid) {
            throw new Error('Anak belum terdaftar');
        }
        return murid;
    }

    async isNisOrNisnHasUsed(nis: string, nisn: string) {
        const isNisOrNisnHasUsed = await this.muridQuery.checkIsNisOrNisnHasUsed(nis, nisn);
        if (isNisOrNisnHasUsed) throw new BadRequestException('NIS/NISN sudah terdaftar');
        return
    }

    async create(dto: CreateMuridDto) {
        // check is nis or nisn has used
        await this.isNisOrNisnHasUsed(dto.nis, dto.nisn);

        return await this.muridQuery.create(dto);
    }
}