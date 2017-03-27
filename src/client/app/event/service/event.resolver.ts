import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { EventService } from './event.service';

/**
 * Event Resolver
 */
@Injectable()
export class EventResolver implements Resolve<any> {

    constructor(private service: EventService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.service.getAll();
    }
}
