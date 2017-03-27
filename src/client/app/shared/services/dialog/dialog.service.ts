import { Injectable } from '@angular/core';
import dialogs = require('ui/dialogs');

/**
 * Dialog Service für Benutzer Interaktion
 */
@Injectable()
export class DialogService {

  /**
   * Benutzer kann  mit OK eine Meldung bestätigen
   * @param message
   * @returns {Promise<boolean>}
   */
  confirm(message?: string) {
    return new Promise<boolean>(resolve => {
      dialogs.alert({
        title: 'Meldung',
        message: message,
        okButtonText: 'Ok'
        }).then(() => {
          return resolve(true);
      });
    });
  };

  /**
   * Benutzer kann  mit OK oder Abbrechen eine Meldung bestätigen
   * @param message
   * @returns {Promise<boolean>}
   */
  confirmOkCancel(message?: string) {
    return new Promise<boolean>(resolve => {
      dialogs.confirm({
        title: '',
        message: message,
        okButtonText: 'Ok',
        cancelButtonText: 'Abbrechen',
      }).then(result => {
        return resolve(result);
      });
    });
  };

  /**
   * Benutzer kann  mit Jetzt oder Später eine Meldung bestätigen
   * @param message
   * @returns {Promise<boolean>}
   */
  confirmNowLater(message?: string, title?: string, ) {
    return new Promise<boolean>(resolve => {
      dialogs.confirm({
        title: title,
        message: message,
        okButtonText: 'Jetzt',
        cancelButtonText: 'Später',
      }).then(result => {
        return resolve(result);
      });
    });
  };

  /**
   * Benutzer kann ein Löschvorgang mit LÖSCHEN oder ABBRECHEN bestätigen
   * @param message
   * @returns {Promise<boolean>}
   */
  confirmDelete(message?: string) {
    return new Promise<boolean>(resolve => {
      dialogs.confirm({
        title: 'Löschen bestätigen',
        message: message,
        okButtonText: 'LÖSCHEN',
        cancelButtonText: 'ABBRECHEN',
      }).then(result => {
        return resolve(result);
      });
    });
  };
}
