import { Injectable } from '@nestjs/common';
import { GuruQuery } from '../prisma/queries/guru/guru.query';





@Injectable()
export class GuruRepository {
    constructor(private readonly guruQuery: GuruQuery) { }
}