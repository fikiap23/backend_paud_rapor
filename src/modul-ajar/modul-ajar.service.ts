import { Injectable } from '@nestjs/common';
import { ModulAjarRepository } from './modul-ajar.repository';
import CreateModulAjarDto from './dto/create-modul-ajar.dto';
import { UpdateModulAjarDto } from './dto/update-modul-ajar.dto';

@Injectable()
export class ModulAjarService {
    constructor(private readonly modulAjarRepository: ModulAjarRepository) { }

    async createModulAjar(token: string, dto: CreateModulAjarDto) {
        return await this.modulAjarRepository.createModulAjar(token, dto)
    }

    async updateModulAjar(token: string, id: string, dto: UpdateModulAjarDto) {
        return await this.modulAjarRepository.updateById(token, id, dto)
    }
}