import { Injectable } from '@angular/core';


import * as ApplicationSettings from 'application-settings';

import { User } from '../../models';
import { ConfigurationService } from '../';

/**
 * User Service für das Login und Session Handling.
 * Die Daten werden in den Application Settings abgelegt
 */
@Injectable()
export class UsersService {

    /**
     * Key für das Speichern in den Application Settings
     * @type {string}
     */
    private key: string = 'currentUser';

    constructor(private configurationService: ConfigurationService) {}

    /**
     * Ist der Benutzer eingeloggt?
     * @returns {boolean} TRUE wenn eingeloggt
     */
    public isLoggedIn(): boolean {
        if (ApplicationSettings.hasKey(this.key)) {
            let currentUser =  this.getCurrentUser();
            if (currentUser && currentUser.token) {
                return true;
            }
        }
        return false;
    }

    /**
     * Liefert den Token
     * @returns {any}
     */
    public getToken(): string {
        let currentUser = this.getCurrentUser();
        if (currentUser) {
            return currentUser.token;
        }
        return '';
    }

    /**
     * Liefert die User Role
     * @returns {any}
     */
    public getUserRole(): string {
        if (ApplicationSettings.hasKey(this.key)) {
            let currentUser = this.getCurrentUser();
            if (currentUser && currentUser.role) {
                return currentUser.role;
            }
        }
        return '';
    }

    /**
     * Hat der Benutzer die Organisation Role?
     * @returns {boolean} TRUE wenn als Organisation eingeloggt
     */
    public hasOrganisationRole(): boolean {
        if (ApplicationSettings.hasKey(this.key)) {
            let currentUser = this.getCurrentUser();
            if (currentUser && currentUser.role) {
                return (this.configurationService.organisationRole === currentUser.role);
            }
        }
        return false;
    }

    /**
     * Hat der Benutzer die Parent Role?
     * @returns {boolean} TRUE wenn als Parent eingeloggt
     */
    public hasParentRole(): boolean {
        if (ApplicationSettings.hasKey(this.key)) {
            let currentUser = this.getCurrentUser();
            if (currentUser && currentUser.role) {
                return(this.configurationService.parentRole === currentUser.role);
            }
        }
        return false;
    }

    /**
     * Liefert die Organisations Id
     * @returns {any}
     */
    public getOrganisationId(): string {
        if (ApplicationSettings.hasKey(this.key)) {
            let currentUser = this.getCurrentUser();
            if (currentUser && currentUser.organisationId) {
                return currentUser.organisationId;
            }
        }
        return '';
    }

    /**
     * Liefert die Parent Id
     * @returns {any}
     */
    public getParentId(): string {
        if (ApplicationSettings.hasKey(this.key)) {
            let currentUser = this.getCurrentUser();
            if (currentUser && currentUser.parentId) {
                return currentUser.parentId;
            }
        }
        return '';
    }

    /**
     * Ist der Benutzer zum erstenmal eingeloggt?
     * @returns {any} TRUE wenn Erstes Login des Benutzer
     */
    public getIsFirstLogin(): boolean {
        if (ApplicationSettings.hasKey(this.key)) {
            let currentUser = this.getCurrentUser();
            if (currentUser) {
                return currentUser.firstLogin;
            }
        }
        return true;
    }

    /**
     * Liefert die User Id
     * @returns {any}
     */
    public getUserId(): string {
        if (ApplicationSettings.hasKey(this.key)) {
            let currentUser = this.getCurrentUser();
            if (currentUser && currentUser.userId) {
                return currentUser.userId;
            }
        }
        return '';
    }

    /**
     * Liefert die Uid
     * @returns {any}
     */
    public getUid(): string {
        if (ApplicationSettings.hasKey(this.key)) {
            let currentUser = this.getCurrentUser();
            if (currentUser && currentUser.contractId) {
                return currentUser.contractId;
            }
        }
        return '';
    }

    /**
     * Lieset den Benutzername des aktuellen Benutzer
     * @returns {any}
     */
    public getUserName(): string {
        if (ApplicationSettings.hasKey(this.key)) {
            let currentUser = this.getCurrentUser();
            if (currentUser && currentUser.name) {
                return currentUser.name;
            }
        }
        return '';
    }

    /**
     * Liest den User aus den Application Settings
     * @returns {any}
     */
    private getCurrentUser() {
        return JSON.parse(ApplicationSettings.getString(this.key));
    }

    /**
     * Speichert die Parent ID in den ApplicationSettings
     * @param parentId
     */
    public saveParentId(parentId: string) {
        if (ApplicationSettings.hasKey(this.key)) {
            let currentUser = this.getCurrentUser();
            currentUser.parentId = parentId;
            this.saveUser(currentUser);
        }
    }

    /**
     * Speicher firstLogin in den ApplicationSettings
     * @param firstLogin
     */
    public saveFirstLogin(firstLogin: boolean) {
        if (ApplicationSettings.hasKey(this.key)) {
            let currentUser = this.getCurrentUser();
            currentUser.firstLogin = firstLogin;
            this.saveUser(currentUser);
        }
    }

    /**
     * Speicher den Usernamen ApplicationSettings
     * @param username
     */
    public saveUserName(username: string) {
        if (ApplicationSettings.hasKey(this.key)) {
            let currentUser = this.getCurrentUser();
            currentUser.name = username;
            this.saveUser(currentUser);
        }
    }

    /**
     * Speicher den User in den ApplicationSettings
     * @param username
     */
    public saveUser(user: User ): void {
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            ApplicationSettings.setString(this.key, JSON.stringify(user));
        }
    }

    /**
     * Löschen des User aus den ApplicationSettings
     */
    public removeUser(): void {
        ApplicationSettings.remove('currentUser');
    }
}

