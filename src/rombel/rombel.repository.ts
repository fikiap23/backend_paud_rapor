import { Injectable } from '@nestjs/common';
import { RombelQuery } from '../prisma/queries/rombel/rombel.query';

@Injectable()
export class RombelRepository {
    constructor(private readonly rombelQuery: RombelQuery) { }
}