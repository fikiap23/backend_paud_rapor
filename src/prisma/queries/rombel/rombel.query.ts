import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';



@Injectable()
export class RombelQuery extends DbService {
}