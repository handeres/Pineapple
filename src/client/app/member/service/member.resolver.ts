import { Injectable } from '@angular/core';

import { Member} from '../model';
import { MemberService } from './member.service';
import { DefaultResolver} from '../../shared/base';

/**
 * Member Resolver
 */
@Injectable()
export class MemberResolver extends DefaultResolver<Member> {

    constructor(protected service: MemberService) {
        super(service);
    }

}