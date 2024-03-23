import { Injectable } from '@nestjs/common';
import { MuridRepository } from './murid.repository';
import CreateMuridDto from './dto/create-murid.dto';
import { UpdateMuridDto } from './dto/update-murid.dto';


@Injectable()
export class MuridService {
    constructor(private readonly muridRepository: MuridRepository) { }

    async create(dto: CreateMuridDto) {
        return await this.muridRepository.create(dto);
    }

    async updateById(id: string, dto: UpdateMuridDto) {
        return await this.muridRepository.updateById(id, dto);
    }
}