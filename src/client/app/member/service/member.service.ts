import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { JwtHttpService, DataService, ConfigurationService, ImageService } from '../../shared/services/';
import { Member } from '../model';

/**
 * Member Service mit http Services siehe {@link DataService}
 */
@Injectable()
export class MemberService extends DataService<Member> {

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
        return this.configurationService.memberUrl;
    }


    /**
     * Liefert die Gruppennamen einer Organisation
     * @returns  group http Url
     */
    getOrganisationGroupNames() {
        return Observable.create(observer => {
            this.jwtHttp.get(this.configurationService.organisationNamesUrl).subscribe(
                data => {
                    observer.next(data);
                    observer.complete();
                });
        });
    }

    /**
     * Registierung eines Parent
     * @param id
     * @param contractId
     * @returns {any}
     */
    public registerParentMember(id: String, contractId: string) {
        return Observable.create(observer => {
            this.jwtHttp.post(this.configurationService.registerParentMemberUrl + '/' + id, { contractId: contractId})
                .subscribe(
                    data => {
                        observer.next(data);
                        observer.complete();
                    });
        });
    }

    /**
     *  Setzt den ImageSource mit den Daten des Imag Cache
     *  @param {data} Array of Member or one member
     */
    public setImageSource(data) {
        if (Array.isArray(data)) {
            data.forEach(member => {
                member.imageSource = this.imageService.getImageFromCache(member._id);
            });
        } else {
            data.imageSource = this.imageService.getImageFromCache(data._id);
        }
    }
}
