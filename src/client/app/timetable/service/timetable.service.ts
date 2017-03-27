import { Injectable } from '@angular/core';

import { JwtHttpService, DataService, ConfigurationService, ImageService } from '../../shared/services/';

/**
 * TimetableService mit http Services siehe {@link DataService}
 */
@Injectable()
export class TimeTableService extends DataService<any> {

    constructor(jwtHttp: JwtHttpService,
                private configurationService: ConfigurationService,
                private imageService: ImageService) {
        super(jwtHttp);
    }

    /**
     * Liefert http url
     * @returns  group http Url
     */
    protected  getServiceUrl(): String {
        return this.configurationService.timeTableUrl;
    }
}
