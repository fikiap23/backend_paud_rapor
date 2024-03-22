import { Injectable } from '@nestjs/common';
import { GuruRepository } from './guru.repository';





@Injectable()
export class GuruService {
    constructor(private readonly guruRepository: GuruRepository) { }

}