import { Injectable } from '@nestjs/common';
import { GuruRepository } from './guru.repository';
import CreateGuruDto from './dto/create-guru.dto';

@Injectable()
export class GuruService {
    constructor(private readonly guruRepository: GuruRepository) { }

    async create(dto: CreateGuruDto) {
        return await this.guruRepository.create(dto)
    }
}