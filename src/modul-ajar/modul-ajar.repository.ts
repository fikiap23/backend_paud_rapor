import { BadRequestException, Injectable } from '@nestjs/common';
import { ModulAjarQuery } from '../prisma/queries/modul-ajar/modul-ajar.query';
import { AuthRepository } from '../auth/auth.repository';
import { PayloadToken } from '../auth/type';
import CreateModulAjarDto from './dto/create-modul-ajar.dto';
import { MapelRepository } from '../mapel/mapel.repository';

@Injectable()
export class ModulAjarRepository {
    constructor(
        private readonly modulAjarQuery: ModulAjarQuery,
        private readonly authRepository: AuthRepository,
        private readonly mapelRepository: MapelRepository
    ) { }

    async findAllModulAjar() {
        return await this.modulAjarQuery.findAll();
    }

    async findByIdOrThrow(id: string) {
        const modulAjar = await this.modulAjarQuery.findById(id);
        if (!modulAjar) throw new BadRequestException('Modul Ajar tidak ditemukan');
        return modulAjar
    }

    async checkIsMingguHasUsed(minggu: number, idMapel: string, idRombel: string) {
        ;
        const modulAjar = await this.modulAjarQuery.checkIsMingguHasUsed(minggu, idMapel, idRombel);
        if (modulAjar) throw new BadRequestException('Minggu ini sudah ada modul ajar');
        return
    }

    async createModulAjar(token: string, dto: CreateModulAjarDto) {
        // check mapel is exist
        await this.mapelRepository.findByIdOrThrow(dto.idMapel);
        // get decode payload jwt token
        const { idsRombel } = (await this.authRepository.decodeJwtToken(token)) as PayloadToken;
        await this.checkIsMingguHasUsed(dto.minggu, dto.idMapel, idsRombel[0]);
        const modulAjar = await this.modulAjarQuery.create(idsRombel[0], dto);
        if (!modulAjar) throw new BadRequestException('Modul Ajar gagal ditambahkan');
        return modulAjar
    }
}