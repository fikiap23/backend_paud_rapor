import { Injectable } from '@nestjs/common';
import { DbService } from '../../db.service';

@Injectable()
export class ModulAjarQuery extends DbService {
}