import { Injectable } from '@angular/core';

import { Organisation } from '../model';
import { OrganisationService } from './organisation.service';
import { DefaultResolver} from '../../shared/base';

/**
 * Organisations Resolver
 */
@Injectable()
export class OrganisationResolver extends DefaultResolver<Organisation> {

    constructor(protected service: OrganisationService) {
        super(service);
    }

}