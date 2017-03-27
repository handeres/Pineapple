import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

import { UsersService } from '../';

/**
 * JSON Web Token Service
 * Setzen der HTTP Header Parameter für das Session Handling
 */
@Injectable()
export class JwtService {

  constructor(private usersService: UsersService) { }

    /**
     * Liefert die HTTP Request Options
     * @returns {RequestOptions}
     */
  getToken() {
      // create authorization header with jwt token
      if (this.usersService.isLoggedIn()) {
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', /*'Bearer ' + */this.usersService.getToken());
          headers.append('userid', this.usersService.getUserId());
          headers.append('uid', this.usersService.getUid());
          headers.append('role', this.usersService.getUserRole());
          headers.append('organisationid', this.usersService.getOrganisationId());
          headers.append('parentid', this.usersService.getParentId());
          return new RequestOptions({headers: headers});
      }
      let headers = new Headers();
      headers.append( 'Content-Type', 'application/json' );
      return new RequestOptions({ headers: headers });
    }
}
