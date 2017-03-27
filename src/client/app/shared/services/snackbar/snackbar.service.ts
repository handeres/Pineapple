import { Injectable } from '@angular/core';
import { SnackBar, SnackBarOptions } from 'nativescript-snackbar';


/**
 * Snackbar Service
 */
@Injectable()
export class SnackbarService {

    constructor() {
    }

    /**
     * Erzeugt eine Snackbar
     * @param text
     */
    public makeText(text: string, duration?: number): void {

        if (duration === undefined) {
            duration = 10000;
        }

        let options: SnackBarOptions = {
            actionText: '',
            actionTextColor: '#ff4081',
            snackText: text,
            hideDelay: duration
        };
        let snackbar = new SnackBar();
        snackbar.action(options).then((args) => {})
            .catch((err) => {

            });
    }

}