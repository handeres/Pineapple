import { Injectable } from '@angular/core';

import { Absence } from '../index';
import { AbsenceService } from './absence.service';
import { DefaultResolver} from '../../shared/base';

/**
 * Resolver für die Absenzen
 */
@Injectable()
export class AbsenceResolver extends DefaultResolver<Absence> {

    constructor(protected service: AbsenceService) {
        super(service);
    }
}