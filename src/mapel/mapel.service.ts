import { Injectable } from '@nestjs/common';
import { MapelRepository } from './mapel.repository';
import CreateMapelDto from './dto/create-mapel.dto';
import { UpdateMapelDto } from './dto/update-mapel.dto';

@Injectable()
export class MapelService {
    constructor(private readonly mapelRepository: MapelRepository) { }

    async create(dto: CreateMapelDto) {
        return await this.mapelRepository.create(dto)
    }

    async update(id: string, dto: UpdateMapelDto) {
        return await this.mapelRepository.update(id, dto)
    }
}