import { Injectable } from '@nestjs/common';
import { GuruRepository } from './guru.repository';
import CreateGuruDto from './dto/create-guru.dto';
import { UpdateGuruDto } from './dto/update-guru.dto';

@Injectable()
export class GuruService {
    constructor(private readonly guruRepository: GuruRepository) { }

    async create(dto: CreateGuruDto) {
        return await this.guruRepository.create(dto)
    }

    async updateByAdmin(id: string, dto: UpdateGuruDto) {
        return await this.guruRepository.updateByAdmin(id, dto)
    }
}