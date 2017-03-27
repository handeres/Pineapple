import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Register } from '../model';
import { User } from '../../shared/models/';
import { JwtHttpService, DataService, ConfigurationService, UsersService, NotificationService } from '../../shared/services/';

/**
 *  Authentifizierungs Komponente.
 *  Registerierung eines Benutzer, Login und Logout
 */
@Injectable()
export class AuthenticationService extends DataService<User> {

    private user: User = null;

    constructor(jwtHttp: JwtHttpService,
                private configurationService: ConfigurationService,
                private userService: UsersService,
                private notificationService: NotificationService) {
        super(jwtHttp);
        this.user = new User();
    }

    protected getServiceUrl(): String {
        return this.configurationService.organisationUrl;
    }

    public getLoginName(): string {
        return this.user.name;
    }

    public setLoginName(userName: string): void {
        this.user.name = userName;

    }

    public setPassword(password: string): void {
        this.user.password = password;
    }

    /**
     *  Authentifizierungs Komponente.
     */
    public login() {
        return Observable.create(observer => {
            this.jwtHttp.post(this.configurationService.authenticateUrl, this.user)
                .subscribe(
                    data => {
                        this.userService.saveUser(data);
                        this.userService.saveUserName(this.user.name);
                        this.notificationService.connect();
                        observer.next(data);
                        observer.complete();
                    });
        });
    }

    /**
     *  Logout des aktuellen Benutzer
     */
    public logout(): void {
        this.userService.removeUser();
        this.notificationService.disconnect();
        this.setLoginName('');
    }

    /**
     *  Validiert ob der Username vorhanden ist
     */
    public validateUser() {
        return this.jwtHttp.post(this.configurationService.hasUserUrl, { email: this.getLoginName()});
    }

    /**
     *  Registrierung
     */
    public register(registerModel: Register) {
        return this.jwtHttp.post(this.configurationService.registerUrl, registerModel);
    }
}
