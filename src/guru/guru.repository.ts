import { BadRequestException, Injectable } from '@nestjs/common';
import { GuruQuery } from '../prisma/queries/guru/guru.query';
import { AuthRepository } from '../auth/auth.repository';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import CreateGuruDto from './dto/create-guru.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RoleEnum } from '../helpers/helper';





@Injectable()
export class GuruRepository {
    constructor(private readonly guruQuery: GuruQuery, private readonly authRepository: AuthRepository, private readonly prisma: PrismaService) { }

    async create(dto: CreateGuruDto) {
        try {
            // periksa apakah guru sudah ada
            await this.checkGuruExist(dto.nip)

            // buat akun guru
            const akunGuruDto: CreateUserDto = {
                username: dto.nip,
                password: dto.nip
            }
            const akunGuru = await this.registerAkunGuru(akunGuruDto);

            // buat data guru
            const dataGuru = await this.guruQuery.create(akunGuru.id, dto);
            if (!dataGuru) throw new BadRequestException('Guru gagal ditambahkan');
            return dataGuru

        }
        catch (error) {
            throw error
        }
    }

    async findGuruByNipOrThrow(nip: string) {
        const guru = await this.guruQuery.findByNip(nip);
        if (!guru) throw new BadRequestException('Guru tidak ditemukan');
        return guru
    }

    async checkGuruExist(nip: string) {
        const guru = await this.guruQuery.findByNip(nip);
        if (guru) throw new BadRequestException('Guru sudah terdaftar');
        return null
    }


    /*
      |--------------------------------------------------------------------------
      | Helper guru function
      |--------------------------------------------------------------------------
      */

    async registerAkunGuru(dto: CreateUserDto) {
        const akunGuru = await this.authRepository.createUser(dto, RoleEnum.GURU);
        if (!akunGuru) throw new BadRequestException('Guru gagal ditambahkan');
        return akunGuru
    }
}