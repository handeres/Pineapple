import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { JwtService, ErrorHandlerService } from '../';

/**
 * Basis Jwt HTTP Service
 */
@Injectable()
export class JwtHttpService {

    constructor(private http: Http,
                private jwt: JwtService,
                private errorHandlerService: ErrorHandlerService) {}

    /**
     * HTTP Post Request
     * @param service
     * @param data
     * @returns {any}
     */
    post(service: string, data: any) {
        return Observable.create(observer => {
         this.http.post(service, data, this.jwt.getToken())
         .map(res => res.json()).subscribe(
             data => {
                 this.handleNoSuccess(data);
                 observer.next(data);
                 observer.complete();
             },
             error => {
                 this.errorHandlerService.handleError({message: 'Keine Verbindung zum Server!' + error.toString()});
                 return Observable.throw(error);
             });
        });
    }

    /**
     * HTTP GET Request
     * @param service
     * @returns {any}
     */
    get(service: string) {
        return Observable.create(observer => {
         this.http.get(service, this.jwt.getToken())
         .map(res => res.json()).subscribe(
             data => {
                 this.handleNoSuccess(data);
                 observer.next(data);
                 observer.complete();
             },
             error => {
                 this.errorHandlerService.handleError({message: 'Keine Vernbindung zum Server!' + error.toString()});
                 return Observable.throw(error);
            });
         });
    }

    /**
     * Error Handler
     * @param data
     */
    private handleNoSuccess(data) {
        if (data.success !== undefined) {
            if (false === data.success) {
                this.errorHandlerService.handleError(data);
            }
        }
    }
}
