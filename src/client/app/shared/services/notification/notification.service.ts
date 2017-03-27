import { Injectable, OnDestroy } from '@angular/core';

import * as SocketIO from 'nativescript-socket.io';

import { ConfigurationService, UsersService } from '../';
import { RouterService } from '../router';

import * as LocalNotifications from 'nativescript-local-notifications';


/**
 * Notification Service.
 * Empfangen von Messages per Weboscket und Ausgabe als lokale Notification beim Device
 */
@Injectable()
export class NotificationService implements OnDestroy {

    /**
     * Websocket socket
     */
    private socket: any;
    /**
     * This Context wird in Member gepscihert
     * Statisch weil LocalNotifications.schedule ebenfalls statisch ist
     */
    //
    public static context: NotificationService;
    /**
     * Forlaufende ID der empfangenen Messages für die Zuordnung der Parameter
     */
    public static id: number;
    /**
     * Parameter zwischen Speicher für notification.
     * @type {Map<number, string>|Map<K, V>}
     */
    public static paramter = new Map<number, string>();

    constructor(private configurationService: ConfigurationService,
                private routerService: RouterService,
                private usersService: UsersService) {
        SocketIO.enableDebug();
        NotificationService.context = this;
        NotificationService.id = 1;

        LocalNotifications.addOnMessageReceivedCallback(
            function (notification) {
                let id = NotificationService.paramter.get(notification.id);
                switch (notification.title) {
                    case 'Abwesenheit' : {
                        NotificationService.context.routerService.navigate(['absence/detail', id]);
                        break;
                    };
                    case 'Event' : {
                        NotificationService.context.routerService.navigate(['event/detail', id]);
                        break;
                    };
                }
                NotificationService.paramter.delete(notification.id);
            }
        ).then(
            function() {}
        );
    }

    /**
     * Websocket Verbindung zum Server Aufbauen
     */
    public connect(): void {
        let id;
        if (this.usersService.getUserRole() === this.configurationService.parentRole) {
            id = this.usersService.getParentId();
        } else if (this.usersService.getUserRole() === this.configurationService.organisationRole) {
            id = this.usersService.getOrganisationId();
        }
        let options = {
            query: {
                userId: this.usersService.getUserId(),
                id: id
            },
        };
        this.socket = SocketIO.connect(this.configurationService.wsUrl, options);

        this.socket.on('message', function(data){
            NotificationService.sendNotification(data.title, data.text, data.parameter);
        });
    }

    /**
     * Websocket Verbindung schliessen
     */
    public disconnect(): void {
        if (undefined !== this.socket) {
            this.socket.emit('disconnect');
            this.socket.close();
            this.socket.disconnect();
        }
    }

    public ngOnDestroy(): void {
        this.disconnect();
    }

    /**
     * Erzeugen einer lokaen Notification beim Device
     * @param title
     * @param text
     * @param id
     * @param parameter
     */
    private static sendNotification(title: string, text: string, parameter: string): void {
        NotificationService.id = NotificationService.id + 1;
        NotificationService.paramter.set(NotificationService.id, parameter);
        LocalNotifications.schedule([{
            id: NotificationService.id,
            title: title,
            body: text,
            ongoing: true,
            smallIcon: 'res://logo_login',
            largeIcon: 'res://logo_login',
            at: new Date(new Date().getTime()),
        }]).then(
            function() {
            },
            function(error) {
            }
        );
    }
}