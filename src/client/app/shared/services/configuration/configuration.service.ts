import { Injectable } from '@angular/core';

/**
 * Konfigurationsservice für REST URL
 */
@Injectable()
export class ConfigurationService {

    constructor() { }

    public get organisationUrl(): string {
        return this.baseUrl + 'organisation';
    }

    public get groupUrl(): string {
        return this.baseUrl + 'groups';
    }

    public get parentUrl(): string {
        return this.baseUrl + 'parents';
    }

    public get memberUrl(): string {
        return this.baseUrl + 'members';
    }

    public get groupMemberUrl(): string {
        return this.memberUrl + '/group';
    }

    public get timeTableUrl(): string {
        return this.baseUrl + 'timetable';
    }

    public get parentGroupUrl(): string {
        return this.memberUrl + '/parentGroup';
    }

    public get organisationMemberUrl(): string {
        return this.memberUrl + '/organisation';
    }

    public get organisationNamesUrl(): string {
        return this.groupUrl + '/namesOrganisation';
    }

    public get parentMemberUrl(): string {
        return this.memberUrl + '/parent';
    }

    public get groupNamesUrl(): string {
        return this.groupUrl + '/organisation';
    }

    public get groupOverviewUrl(): string {
        return this.groupUrl + '/overview';
    }

    public get absenceUrl(): string {
        return this.baseUrl + 'absences';
    }

    public get absenceReasonsUrl(): string {
        return this.absenceUrl + '/reasons';
    }

    public get eventUrl(): string {
        return this.baseUrl + 'events';
    }

    public get imageUrl(): string {
        return this.baseUrl + 'images';
    }

    public get createImageUrl(): string {
        return this.imageUrl + '/create';
    }

    public get registerParentMemberUrl(): string {
        return this.parentUrl + '/addNewMember';
    }

    public get registerUrl(): string {
        return this.baseUrl + 'users/register';
    }

    public get authenticateUrl(): string {
        return this.baseUrl + 'users/authenticate';
    }

    public get hasUserUrl(): string {
        return this.baseUrl + 'users/hasUser';
    }

    public get ipUrl(): string {
        //return 'http://10.0.2.2:3333'; //Localhost
        return 'http://192.168.0.12:3333';
    }

    public get wsUrl(): string {
        return this.ipUrl;
    }

    public get baseUrl(): string {
        return this.ipUrl + '/api/';
    }

    public get organisationRole(): string {
        return 'Organisation';
    }

    public get parentRole(): string {
        return 'Parent';
    }

    public get memberRole(): string {
        return 'Member';
    }
}
