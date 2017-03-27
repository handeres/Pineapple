import { Injectable } from '@angular/core';

import { Event } from '../index';
import { JwtHttpService, DataService, ConfigurationService } from '../../shared/services/';

/**
 * Event Service mit http Services siehe {@link DataService}
 */
@Injectable()
export class EventService extends DataService<Event> {

    constructor(jwtHttp: JwtHttpService,
                private configurationService: ConfigurationService) {
        super(jwtHttp);
    }

    /**
     * Liefert http url
     */
    protected getServiceUrl(): String {
        return this.configurationService.eventUrl;
    }
}
