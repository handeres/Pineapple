import { Injectable } from '@angular/core';

import { TimetableDay} from '../model';
import { TimeTableService } from './timetable.service';
import { DefaultResolver} from '../../shared/base';

/**
 * Member Resolver
 */
@Injectable()
export class TimeTableResolver extends DefaultResolver<any> {

    constructor(protected service: TimeTableService) {
        super(service);
    }

}