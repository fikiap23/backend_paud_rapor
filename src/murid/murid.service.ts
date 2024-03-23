import { Injectable } from '@nestjs/common';
import { MuridRepository } from './murid.repository';


@Injectable()
export class MuridService {
    constructor(private readonly muridRepository: MuridRepository) { }

}