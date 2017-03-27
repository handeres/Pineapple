import { Injectable } from '@angular/core';

import {JwtHttpService, DataService, ConfigurationService } from '../../shared/services/';
import {Organisation} from '../model/organisation';

/**
 * Organisations Service mit http Services siehe {@link DataService}
 */
@Injectable()
export class OrganisationService extends DataService<Organisation> {

  constructor(jwtHttp: JwtHttpService,
              private configurationService: ConfigurationService) {
    super(jwtHttp);
  }

  /**
   * Liefert http url
   * @returns  Organisations http Url
   */
  protected  getServiceUrl(): String {
    return this.configurationService.organisationUrl;
  }
}
