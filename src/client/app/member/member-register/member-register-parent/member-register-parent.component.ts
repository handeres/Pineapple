import { Component, ViewChild } from '@angular/core';

import { PageRoute } from 'nativescript-angular/router';

import { RadDataFormComponent } from 'nativescript-telerik-ui-pro/dataform/angular';

import { Contract } from '../';
import { MemberService } from '../../service';
import { RouterService, UsersService } from '../../../shared';
import { SubscriptionBase} from '../../../shared';
/**
 * Member Registrierungskomponente den Parent
 */
@Component({
    selector: 'member-register-parent',
    templateUrl: 'member/member-register/member-register-parent/member-register-parent.component.html',
    styleUrls: ['member/member-register/member-register-parent/member-register-parent.component.css']
})
export class MemberRegisterParentComponent extends SubscriptionBase  {

    public contract: Contract;
    @ViewChild('contractDataFormComp')
    contractDataFormComp: RadDataFormComponent;

    constructor(private pageRoute: PageRoute,
                private routerService: RouterService,
                private usersService: UsersService,
                private memberService: MemberService) {
        super();
        this.contract = new Contract();
        // Notwendig damit der this.routerService.navigateToPrevious() funktioniert
        this.pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params)
            .subscribe(params => {
        });
    }

    /**
     *  Registiert den Member auf dem Server
     */
    public onSubmit(): void {
        this.contractDataFormComp.dataForm.commitAll();
        if (this.contractDataFormComp.dataForm.hasValidationErrors()) {
            return;
        }
        this.memberService.registerParentMember(this.usersService.getParentId(), this.contract.id).subscribe(
            data => {
                if (data.success) {
                    this.onBack();
                }
            });
    }

    /**
     *  Navigiert zur letzten Page zurück
     */
    public onBack(): void {
        this.routerService.navigateToPrevious(this);
    }
}
