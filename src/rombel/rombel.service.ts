import { Injectable } from '@nestjs/common';
import { RombelRepository } from './rombel.repository';

@Injectable()
export class RombelService {
    constructor(private readonly rombelRepository: RombelRepository) { }

}