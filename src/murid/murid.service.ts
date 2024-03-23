import { Injectable } from '@nestjs/common';
import { MuridRepository } from './murid.repository';
import CreateMuridDto from './dto/create-murid.dto';


@Injectable()
export class MuridService {
    constructor(private readonly muridRepository: MuridRepository) { }

    async create(dto: CreateMuridDto) {
        return await this.muridRepository.create(dto);
    }
}