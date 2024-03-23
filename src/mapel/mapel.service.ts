import { Injectable } from '@nestjs/common';
import { MapelRepository } from './mapel.repository';
import CreateMapelDto from './dto/create-mapel.dto';

@Injectable()
export class MapelService {
    constructor(private readonly mapelRepository: MapelRepository) { }

    async create(dto: CreateMapelDto) {
        return await this.mapelRepository.create(dto)
    }
}