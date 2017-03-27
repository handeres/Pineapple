import { Injectable } from '@angular/core';

import { JwtHttpService, DataService, ConfigurationService, ImageService } from '../../shared/services/';
import { Absence } from '../model';

/**
 * Absence Service mit http Services siehe {@link DataService}
 */
@Injectable()
export class AbsenceService extends DataService<Absence> {

    constructor(jwtHttp: JwtHttpService,
                private configurationService: ConfigurationService,
                private imageService: ImageService) {
        super(jwtHttp);
    }

    /**
     * Liefert http url
     */
    protected  getServiceUrl(): String {
        return this.configurationService.absenceUrl;
    }

    /**
     * Liefert Bilder vom Cache
     */
    public getImageSource(data) {
        data.forEach(member => {
            member.imageSource =  this.imageService.getImageFromCache(member.memberId);
        });
    }
}
