import { BadRequestException, Injectable } from '@nestjs/common';
import { NilaiMingguanQuery } from '../prisma/queries/nilai-mingguan/nilai-mingguan.query';
import { CreatePenilaianMingguanDto } from './dto/create-nilai-mingguan.dto';
import { ModulAjarRepository } from '../modul-ajar/modul-ajar.repository';
import { AuthRepository } from '../auth/auth.repository';
import { PayloadToken } from '../auth/type';
import { MuridRepository } from '../murid/murid.repository';

@Injectable()
export class NilaiMingguanRepository {
    constructor(
        private readonly nilaiMingguanQuery: NilaiMingguanQuery,
        private readonly modulAjarRepository: ModulAjarRepository,
        private readonly authRepository: AuthRepository,
        private readonly muridRepository: MuridRepository
    ) { }

    async findAll() {
        return await this.nilaiMingguanQuery.findAll();
    }

    async findByIdOrThrow(id: string) {
        const nilaiMingguan = await this.nilaiMingguanQuery.findById(id);
        if (!nilaiMingguan) throw new BadRequestException('Nilai Mingguan tidak ditemukan');
        return nilaiMingguan
    }

    async create(token: string, dto: CreatePenilaianMingguanDto) {
        // get decode payload jwt token
        const { idsRombel } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;

        // check modul ajar exist
        const modulAjar = await this.modulAjarRepository.findByIdOrThrow(dto.idModulAjar);

        if (modulAjar.idRombel !== idsRombel[0]) throw new BadRequestException('Akun tidak terdaftar di rombel ini');

        // check murid exist
        const murid = await this.muridRepository.findByIdOrThrow(dto.idMurid);
        if (murid.idRombel !== idsRombel[0]) throw new BadRequestException('Akun tidak terdaftar di rombel ini');

        return await this.nilaiMingguanQuery.create(dto)
    }
}