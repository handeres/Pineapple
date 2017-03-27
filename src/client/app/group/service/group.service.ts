import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { JwtHttpService, DataService, ConfigurationService, ImageService } from '../../shared/services/';
import { Group } from '../model/';

/**
 * Group Service mit http Services siehe {@link DataService}
 */
@Injectable()
export class GroupService extends DataService<Group> {

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
        return this.configurationService.groupUrl;
    }

    /**
     *  Liefert Register Group
     */
    public getRegisterGroup() {
        return Observable.create(observer => {
            observer.next(null);
            observer.complete();
        });
    }

    /**
     *  Setzt den ImageSource mit den Daten des Image Cache
     *  @param {data} Array of group or one group
     */
    public setImageSource(data) {
        if (Array.isArray(data)) {
            data.forEach(group => {
                group.imageSource = this.imageService.getImageFromCache(group._id);
            });
        } else {
            data.imageSource = this.imageService.getImageFromCache(data._id);
        }
    }


}
