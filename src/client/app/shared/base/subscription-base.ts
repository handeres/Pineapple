import { OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { DialogService } from '../../shared/services';

/**
 * Basis Klasse für das unsubscribe von subscriptions
 */
export class SubscriptionBase implements OnDestroy {

    /**
     * Subscription für das unsubscribe
     * @type {Array}
     */
    public subscriptions: Array<Subscription> = [];

    constructor(/*protected dialogService: DialogService*/) {
        this.subscriptions = new Array<Subscription>();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}