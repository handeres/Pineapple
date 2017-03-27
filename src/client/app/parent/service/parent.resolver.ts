import { Injectable } from '@angular/core';

import { Parent } from '../index';
import { ParentService } from './parent.service';
import { DefaultResolver} from '../../shared/base';

/**
 * Parent Resolver
 */
@Injectable()
export class ParentResolver extends DefaultResolver<Parent> {

    constructor(protected service: ParentService) {
        super(service);
    }

}