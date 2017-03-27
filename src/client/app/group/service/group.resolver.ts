import { Injectable } from '@angular/core';

import { Group } from '../model';
import { GroupService } from './group.service';
import { DefaultResolver} from '../../shared/base';

/**
 * Group Resolver
 */
@Injectable()
export class GroupResolver extends DefaultResolver<Group> {

    constructor(protected service: GroupService) {
        super(service);
    }
}