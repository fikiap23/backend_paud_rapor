import { BadRequestException, Injectable } from '@nestjs/common';
import { ModulAjarQuery } from '../prisma/queries/modul-ajar/modul-ajar.query';

@Injectable()
export class ModulAjarRepository {
    constructor(private readonly modulAjarQuery: ModulAjarQuery) { }

    async findAllModulAjar() {
        return await this.modulAjarQuery.findAll();
    }

    async findByIdOrThrow(id: string) {
        const modulAjar = await this.modulAjarQuery.findById(id);
        if (!modulAjar) throw new BadRequestException('Modul Ajar tidak ditemukan');
        return modulAjar
    }

    async checkIsMingguHasUsed(id: string) {

    }
}