import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { GroupService } from './group.service';

/**
 * Group Resolver
 */
@Injectable()
export class GroupDetailResolver implements Resolve<any> {

    constructor(private service: GroupService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.service.getRegisterGroup();
    }
}