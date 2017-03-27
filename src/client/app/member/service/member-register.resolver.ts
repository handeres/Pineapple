import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Member } from '../index';
import { MemberService } from './member.service';

/**
 * Member Register Resolver
 */
@Injectable()
export class MemberRegisterResolver implements Resolve<Member> {

    constructor(private service: MemberService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Member> {
        return  this.service.getOrganisationGroupNames();
    }
}