import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { DataService } from '../services';

/**
 * Default Resolver
 */
@Injectable()
export class DefaultResolver<Item> implements Resolve<any> {

    constructor(protected service: DataService<Item>) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item> {
        let id = route.params['id'];
        let filter = route.params['filter'];
        return this.service.getById(id, filter);
    }
}
