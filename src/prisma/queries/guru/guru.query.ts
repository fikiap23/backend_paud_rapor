import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';
import CreateGuruDto from '../../../guru/dto/create-guru.dto';
import { UpdateGuruDto } from '../../../guru/dto/update-guru.dto';



@Injectable()
export class GuruQuery extends DbService {

    async findByNip(nip: string) {
        return await this.prisma.guru.findUnique({
            where: {
                nip
            }
        })
    }

    async create(idUser: string, data: CreateGuruDto) {
        return await this.prisma.guru.create({
            data: {
                idUser,
                ...data
            }
        })
    }

    async updateById(id: string, data: UpdateGuruDto) {
        return this.prisma.guru.update({
            where: {
                id
            },
            data
        })
    }

    async findById(id: string) {
        return await this.prisma.guru.findUnique({
            where: {
                id
            }
        })
    }
}