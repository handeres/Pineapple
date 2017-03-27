import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { JwtHttpService, DataService, ConfigurationService } from '../../shared/services/';
import { Parent } from '../model';

/**
 * Parent Service mit http Services siehe {@link DataService}
 */
@Injectable()
export class ParentService extends DataService<Parent> {

    constructor(jwtHttp: JwtHttpService,
              private configurationService: ConfigurationService) {
        super(jwtHttp);
    }

    /**
     * Liefert http url
     * @returns  Parent http Url
     */
    protected  getServiceUrl(): String {
        return this.configurationService.parentUrl;
    }
}
