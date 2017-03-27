import { Injectable } from '@angular/core';

import { DialogService } from '../dialog/dialog.service';

/**
 * Error Logger Service
 */
@Injectable()
export class ErrorLoggerService {

    constructor(public dialog: DialogService) {}

    public log(message: string): void {
        this.dialog.confirm(message);
    }
}

