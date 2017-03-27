import { Injectable, OnDestroy } from '@angular/core';

import { RouterExtensions } from 'nativescript-angular/router';
import { NavigationTransition } from 'ui/frame';

/**
 * Router Service
 * Vereinfachung des Routing mit Slide Effekten
 */
@Injectable()
export class RouterService {

    private stack: Array<any[]>;
    public isBusy: boolean = false;

    constructor(public routerExtensions: RouterExtensions) {
        this.stack = new Array<any[]>();
    }

    /**
     * Basis Navigate Funktion
     * @param commands
     * @param clearHistory
     * @param animated
     * @param transition
     */
    public navigate(commands: any[], clearHistory: boolean = false, animated: boolean = false,
        transition: NavigationTransition = undefined, doChache: boolean = true) {

        this.isBusy = true;
        this.routerExtensions.navigate(commands, {
            clearHistory: clearHistory,
            animated: animated,
            transition: transition
        }).then(() => {
            if (transition !== undefined) {
                transition.name = transition.name === 'slideLeft' ? 'slideRight' : 'slideLeft';
            }
            if (doChache) {
                this.stack.push([commands, transition]);
            }
            this.isBusy = false;
        }).catch(() => {
            this.isBusy = false;
        });
    }

    /**
     * Navigation mit Slide auf die linke Seite
     * @param commands
     * @param clearHistory
     */
    public navigateSlideLeft(commands: any[], clearHistory: boolean = false, doChache:  boolean = true) {
        this.navigate(commands, clearHistory, true, {
            name: 'slideLeft',
            duration: 200,
            curve: 'linear'
        },
        doChache);
    }

    /**
     * Navigation mit Slider auf die Rechte Seite
     * @param commands
     * @param clearHistory
     */
    public navigateSlideRight(commands: any[], clearHistory: boolean = false, doChache:  boolean = true) {
        this.navigate(commands, clearHistory, true, {
            name: 'slideRight',
            duration: 200,
            curve: 'linear'
        },
        doChache);
    }

    /**
     * Navigiert auf die vorher
     */
    public navigateToPrevious(object?: OnDestroy) {
        this.isBusy = true;
        // get transition from current page from stack
        let current = this.stack[this.stack.length - 1];
        let transition = current[1];
        // get previous url from stack
        let previous = this.stack[this.stack.length - 2];
        let commands = previous[0];
        this.routerExtensions.navigate(commands, {
            animated: transition !== undefined,
            transition: transition
        }).then(() => {
            this.isBusy = false;
            // remove current url from stack
            this.stack.pop();
            if (object !== undefined) {
                object.ngOnDestroy();
            }
        }).catch(() => {
            this.isBusy = false;
            if (object !== undefined) {
                object.ngOnDestroy();
            }
        });;
    }

    public pop(): void {
        this.stack.pop();
    }
}
