import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageRoute } from 'nativescript-angular/router';

import 'rxjs/add/operator/switchMap';

import { MemberRegister } from '../model';
import { MemberService } from '../service';
import { MemberBase} from '../base';
import { RouterService, UsersService } from '../../shared/services';

/**
 * Member Registrierungskomponente für die Organisation
 */
@Component({
    selector: 'member-register',
    templateUrl: 'member/member-register/member-register.component.html',
    styleUrls: ['member/member-register/member-register.component.css']
})
export class MemberRegisterComponent extends MemberBase implements OnInit {

    /**
     * MemberRegister für das Formualr
     */
    public memberRegister: MemberRegister;
    /**
     * Selektierte Group Id für den editier Mode
     */
    public selectedGroupId: string;

    constructor(private pageRoute: PageRoute,
                private route: ActivatedRoute,
                protected routerService: RouterService,
                protected userService: UsersService,
                protected memberService: MemberService) {
        super(routerService,
             userService,
             memberService);
        this.memberRegister = new MemberRegister();
    }

    public ngOnInit(): void {
        this.pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params)
            .subscribe(params => {
                this.selectedGroupId  = params['id'];
            });

        this.route.data.subscribe(data => {
            let result = data['groups'];
            if (result !== undefined) {
                this.groups = result;
                if (this.selectedGroupId !== undefined) {
                        this.memberRegister.groupName = this.convertFrom(this.selectedGroupId);
                }
                this.groupNames = this.getGroupNames();
            }
        });
    }

    /**
     * Setzt die group id
     * @param groupId
     */
    public onSelected(groupId: string) {
        this.selectedGroupId = groupId;
    }

    /**
     *  Erzeugt oder updated einen Member auf dem Server
     */
    public onSubmit(): void {
        if (true === this.hasValidationErrors()) {
            return;
        }
        this.memberForm.member.groupName = this.memberRegister.groupName;
        this.memberForm.member.groupId = this.convertTo(this.memberRegister.groupName);
        this.memberForm.member.name = this.memberRegister.name;
        this.memberForm.member.surname = this.memberRegister.surname;
        this.subscriptions.push(this.memberService.create(this.memberForm.member).subscribe(
            data => {
                if (data.success) {
                    this.onBack();
                }
            }));
    }
}
