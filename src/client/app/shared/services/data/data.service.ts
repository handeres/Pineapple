import { Injectable } from '@angular/core';

import {JwtHttpService} from '../';

/**
 * Abstrakte Klasse für den REST Daten Service
 */
@Injectable()
export abstract class DataService<TItem> {

    constructor(protected jwtHttp: JwtHttpService) { }

    /**
     * Erzeugt ein Item auf dem Server
     * @param item
     * @returns {any}
     */
    create(item: TItem) {
        return this.jwtHttp.post(this.getServiceUrl() + '/create', item);
    }

    /**
     * Updated ein Item auf dem Server
     * @param id
     * @param item
     * @returns {any}
     */
    update(id: String, item: TItem) {
        return this.jwtHttp.post(this.getServiceUrl() + '/update/' + id, item);
    }

    /**
     * Liefert Items nach gemäss Id und Filter
     * @param id
     * @param filter Filtert die Daten entsprechend auf dem Server vor
     * @returns {any}
     */
    getById(id: String, filter?: string) {
        if (filter === undefined) {
            return this.jwtHttp.get(this.getServiceUrl() + '/' + id);
        } else {
            return this.jwtHttp.get(this.getServiceUrl() + '/' + id + '?filter=' + filter);
        }
    }

    /**
     * Liefert alle Items.
     * @param filter Filtert die Daten entsprechend auf dem Server vor
     * @returns {any}
     */
    getAll(filter?: string) {
        if (filter === undefined) {
            return this.jwtHttp.get(this.getServiceUrl() + '/all');
        } else {
            return this.jwtHttp.get(this.getServiceUrl() + '/all' + '?filter=' + filter);
        }
    }

    /**
     * Löscht das Item mit der Id
     * @param id
     * @returns {any}
     */
    deleteById(id: String) {
        return this.jwtHttp.get(this.getServiceUrl() + '/delete/' + id);
    }

    protected abstract getServiceUrl(): String;
}
