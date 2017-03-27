import { platformNativeScriptDynamic } from 'nativescript-angular/platform';

import { AppModule } from './app.module';
// import { enableProdMode } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';


var permissions = require("nativescript-permissions");
declare var android;

/* Ist neuerdings immer notwendig das der Benutzer bestätigt was für Zugriffe erlaubt sind */
permissions.requestPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE, "I need these permissions because I'm cool")
    .then(function () {

    });
registerElement('DropDown', () => require('nativescript-drop-down/drop-down').DropDown);
registerElement("CardView", () => require("nativescript-cardview").CardView);

platformNativeScriptDynamic().bootstrapModule(AppModule);
// enableProdMode();
