/**
 * Created by Hannes on 11.03.2017.
 */
import {  ViewChild } from '@angular/core';

import { RadDataFormComponent } from 'nativescript-telerik-ui-pro/dataform/angular';

import 'rxjs/add/operator/switchMap';

import { MemberForm, Member, Group } from '../model';
import { MemberService } from '../service';
import { RouterService, UsersService } from '../../shared/services';
import { DetailBase } from '../../shared/base';

/**
 * Member Basisklasse mit allgemeinen Funktionen
 */
export class MemberBase extends DetailBase<Member>  {

    /**
     *  Member Formular
     */
    public memberForm: MemberForm;
    /**
     *  Array von Gruppen
     */
    public groups: Array<Group>;
    /**
     *  Array von Gruppen Namen
     */
    public groupNames: Array<String>;
    /**
     *  Gruppen Daten Formular ViewChild
     */
    @ViewChild('memberDataFormComp')
    memberDataFormComp: RadDataFormComponent;

    constructor(protected routerService: RouterService,
                protected userService: UsersService,
                protected memberService: MemberService) {
        super(routerService,
              userService);
        this.memberForm = new MemberForm();
    }

    /**
     * Liefert eine Liste mit Gruppennamen
     * @returns  Name der Group
     */
    public getGroupNames() {
        this.groupNames = this.groups.map((value: Group) => value.name);
        return this.groupNames;
    }

    /**
     * Konvertiert die Id einer Group in dessen Namen
     * @param {string} id  Id der Gruppe
     * @returns  Name der Gruppe
     */
    public convertFrom(id: string): any {
        return this.groups.filter((group: Group) => group._id === id)[0].name;
    }

    /**
     * Konvertiert den Name einer Gruppe in dessen Id
     * @param {string} name Name der Gruppe
     * @returns  Id der Gruppe
     */
    public convertTo(name: string): any {
        return this.groups.filter((group: Group) => group.name === name)[0]._id;
    }

    /**
     * Validierung der Formulardaten
     * @returns  TRUE == Daten sind ok, FALSE == Daten sind nicht gültig
     */
    public hasValidationErrors(): boolean {
        this.memberDataFormComp.dataForm.commitAll();
        if (true === this.memberDataFormComp.dataForm.hasValidationErrors()) {
            return true;
        }
        return false;
    }
}
