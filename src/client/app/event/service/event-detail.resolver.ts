import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';


import { Event } from '../index';
import { EventService } from './event.service';
import { DefaultResolver} from '../../shared/base';

/**
 * Event Detail Resolver
 */
@Injectable()
export class EventDetailResolver extends DefaultResolver<Event> implements Resolve<Event> {

    constructor(protected service: EventService) {
        super(service);
    }
}
