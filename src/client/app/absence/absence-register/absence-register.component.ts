import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageRoute } from 'nativescript-angular/router';
import { RadDataFormComponent } from 'nativescript-telerik-ui-pro/dataform/angular';
import { PropertyConverter } from 'nativescript-telerik-ui-pro/dataform';

import { AbsenceForm, Absence } from '../model/absence';
import { AbsenceService } from '../service';
import { Member } from '../../member';
import { RouterService, UsersService, DialogService } from '../../shared';
import { DetailBase } from '../../shared/base';

/**
 * Absenzen Registeriungs- und Deatilkomponente.
 * Ermöglicht das erfassen und die Detailansicht einer Absenz
 */
@Component({
	selector: 'app-absence-register',
	templateUrl: 'absence/absence-register/absence-register.component.html',
	styleUrls: ['absence/absence-register/absence-register.component.css']
})
export class AbsenceRegisterComponent extends DetailBase<Absence> implements OnInit, PropertyConverter {


	/**
	 *  Absence Form
	 */
	public absenceForm: AbsenceForm;
	/**
	 *  Array von Member Namen
	 */
	public memberNames: Array<string>;

	/**
	 *  Absence Register Daten Formular ViewChild
	 */
	@ViewChild('absenceRegisterDataFormComp')
	absenceRegisterDataFormComp: RadDataFormComponent;

	constructor(private route: ActivatedRoute,
				protected routerService: RouterService,
				protected usersService: UsersService,
				private pageRoute: PageRoute,
				private dialogService: DialogService,
				private absenceService: AbsenceService) {
		super(routerService,
			  usersService);
		this.absenceForm = new AbsenceForm();
		this.isEditMode = false;
	}

	public ngOnInit(): void {
		this.pageRoute.activatedRoute
			.switchMap(activatedRoute => activatedRoute.params)
			.subscribe(params => {
				this.id = params['id'];
				if (this.id !== undefined) {
					this.isEditMode = true;
				}
			});
		this.subscriptions.push(this.route.data.subscribe(data => {
			let absenceData = data['absence'];
			if (absenceData.success !== undefined) {
				if (absenceData.success === false) {
					this.onBack();
					return;
				}
			}
			this.absenceForm = absenceData[0];
			if (this.absenceForm !== null) {
				if (this.isOrganisation) {
					this.memberNames = new Array<string>();
					this.memberNames.push(this.absenceForm.absence.member);
				}
				this.absenceForm.members = this.absenceForm.members;
				this.memberNames = this.getMemberNames();
			}
		}));
	}


	/**
	 * Liefert eine Liste mit Vor- und Nachnamen der Member
 	 * @returns  Name der Member mit Vor- und Nachname
	 */
	public getMemberNames() {
		if (!this.memberNames) {
			this.memberNames = this.absenceForm.members.map((value: Member) => value.name + ' ' + value.surname);
		}
		return this.memberNames;
	}

	/**
	 * Konvertiert die Id eines Members in dessen Namen
	 * @param {string} id  Id des Member
	 * @returns  Names des Members
	 */
	public convertFrom(id: string): any {
		return this.absenceForm.members.filter((member: Member) => member._id === id)[0].name;
	}

	/**
	 * Konvertiert den Name eines Members in dessen Id
	 * @param {string} name Name des Member
	 * @returns  Id des Members
	 */
	public convertTo(name: string): any {
		return this.absenceForm.members.filter((member: Member) => member.name + ' ' + member.surname === name)[0]._id;
	}

	/**
	 *  Erzeugt oder updated eine Absence auf dem Server
	 */
	public onSubmit(): void {
		this.absenceRegisterDataFormComp.dataForm.commitAll();
		if (this.absenceRegisterDataFormComp.dataForm.hasValidationErrors()) {
			return;
		}
		this.routerService.isBusy = true;
		this.absenceForm.absence.memberId = this.convertTo(this.absenceForm.absence.member);
		this.subscriptions.push(this.absenceService.create(this.absenceForm.absence)
			.subscribe(data => {
				if (data.success) {
					this.onBack();
				} else {
					this.routerService.isBusy = false;
				}
			}));
	}

}
