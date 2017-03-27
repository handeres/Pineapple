import { Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/switchMap';

import { ActivatedRoute } from '@angular/router';

import { Page } from 'ui/page';

import { MemberService } from '../service';
import { Member } from '../model';
import { MemberBase} from '../base';
import { UsersService, ConfigurationService, ImageService, DialogService, RouterService } from '../../shared/services';

/**
 * Member Registeriungs- und Deatilkomponente.
 * Ermöglicht das Erfassen und die Detailansicht eines Member
 */
@Component({
  selector: 'app-member-detail',
  templateUrl: 'member/member-detail/member-detail.component.html',
  styleUrls: ['member/member-detail/member-detail.component.css']
})
export class MemberDetailComponent extends MemberBase implements OnInit {

    /**
     *  TRUE wenn nach dem ersten Login die Komponente aufgerufen wird
     */
    public isFirstLogin: boolean;

    constructor(protected routerService: RouterService,
                private page: Page,
                private route: ActivatedRoute,
                protected usersService: UsersService,
                private configurationService: ConfigurationService,
                private imageService: ImageService,
                private dialogService: DialogService,
                protected memberService: MemberService) {
        super(routerService,
              usersService,
              memberService);
    }

    public ngOnInit() {
        this.isOrganisation = this.usersService.hasOrganisationRole();

        if (this.configurationService.parentRole === this.usersService.getUserRole()) {
            this.isFirstLogin = this.usersService.getIsFirstLogin();
        }
        else {
            this.isFirstLogin = false;
        }
        this.subscriptions.push(this.route.data.subscribe(data => {
            let result = data['member'];
            if (result !== undefined) {
                this.select(result);
                this.groups = this.memberForm.groups;
                this.groupNames = this.getGroupNames();
            }
        }));
    }

    /**
     * Initialisiert des Formulars und laden des Bild aus dem Cache
     * @param {Member} member
     */
    private select(member: Member) {
        this.memberForm = member[0];
        this.page.actionBar.title = this.memberForm.member.name + ' ' + this.memberForm.member.surname;
        this.memberService.setImageSource(this.memberForm.member);
    }


    /**
     *  Erzeugt oder updated einen Member auf dem Server
     */
    public onSubmit(): void {
        if (true === this.hasValidationErrors()) {
            return;
        }
        this.routerService.isBusy = true;
        this.memberForm.member.groupId = this.convertTo(this.memberForm.member.groupName);
        this.subscriptions.push(this.memberService.create(this.memberForm.member)
            .subscribe(
                data => {
                    if (this.isFirstLogin) {
                        this.usersService.saveFirstLogin(false);
                        this.routerService.navigateSlideLeft(['parent/dashboard']);
                    } else {
                        this.onBack();
                    }
        }));
        /* Speichere Bild, wenn eine neues selektiert wurde */
        if (this.imageService.hasNewImage(this.memberForm.member._id)) {
            this.subscriptions.push(this.imageService.saveImage(this.memberForm.member._id)
                .subscribe(
                    data => {
                    }));
        }
    }

    /**
     * Navigiert auf die Parent Übersichts Page, falls bereits ein Parent für den Member registriert ist
     */
    public onParent(): void {
        if (this.memberForm.member.parentId !== undefined) {
            this.routerService.navigateSlideLeft(['parent/detail', this.memberForm.member.parentId]);
        } else {
            this.dialogService.confirm('Die Eltern sind noch nicht registriert');
        }
    }

    /**
     * Navigiert zur Absence Überischt
     */
    public onAbsence(): void {
        this.routerService.navigateSlideLeft(['absence/overview', this.memberForm.member._id, { filter: 'member' }]);
    }

    /**
     * Öffnen des Image Dialog des Device um eine Bild auszuwählen
     * @param args
     */
    public onSelectSingleTap(args): void  {
        this.imageService.openNew(this.memberForm.member._id, this.memberForm.member);
    }
}
