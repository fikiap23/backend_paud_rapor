import { Injectable } from '@nestjs/common';
import { MuridQuery } from '../prisma/queries/murid/murid.query';


@Injectable()
export class MuridRepository {
    constructor(private readonly muridQuery: MuridQuery) { }
}