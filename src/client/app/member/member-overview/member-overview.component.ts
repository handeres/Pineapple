import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { PageRoute } from 'nativescript-angular/router';
import { ListViewEventData } from 'nativescript-telerik-ui-pro/listview';

import { Member } from '../model';
import { MemberService } from '../service';

import { RouterService, UsersService, DialogService } from '../../shared';
import { OverviewBase } from '../../shared/base';

/**
 * Member Übersichtskomponente.
 * Listet alle Member in einer ListView auf. Ein Member ist ein Kind.
 */
@Component({
    selector: 'app-member-overview',
    templateUrl: 'member/member-overview/member-overview.component.html',
    styleUrls: ['member/member-overview/member-overview.component.css']
})
export class MemberOverviewComponent extends OverviewBase<Member> implements OnInit {

    /**
     *  Id des Member für editier Mode
     */
    private id: string;
    /**
     *  TRUE == Add Button wird in der Actionbar angezeigt, FALSE == keine Anzeige
     */
    public hasAddButton: boolean;

    /**
     * Filter um den Mode umschalten zu können. Zum erkennen ob die Member als Gruppe gefiltert sind
     */
    private paramFilter: string;


    constructor(private route: ActivatedRoute,
                private pageRoute: PageRoute,
                protected routerService: RouterService,
                protected usersService: UsersService,
                protected dialogService: DialogService,
                protected memberService: MemberService) {
        super(dialogService,
              routerService,
              usersService,
              memberService);

        this.setDeleteConfirmText('Möchten Sie das Kind löschen?')
    }

    ngOnInit() {
        this.hasAddButton = true;
        this.pageRoute.activatedRoute
            .switchMap(activatedRoute => activatedRoute.params)
            .subscribe(params => {
                this.id = params['id'];
                this.paramFilter = params['filter'];
                if (!this.isOrganisation && this.paramFilter === 'group') {
                    this.hasAddButton = false;
                }
            });
        this.subscriptions.push(this.route.data.subscribe(data => {
            let result = data['members'];
            if (result !== undefined) {
                this.items = result;
                this.memberService.setImageSource(this.items);
            }
        }));
    }


    /**
     * Navigiert zur Member Detail Page
     * @param args
     */
    public onItemSelected(args: ListViewEventData): void {
        // Eltern duerfen Gruppen nicht bearbeiten
        if (!this.isOrganisation && this.paramFilter === 'group') {
            return;
        }
        this.routerService.navigateSlideLeft(['member/detail', this.items[args.itemIndex]._id, { filter: 'detail' }]);
    }


    /**
     *  Navigiert zur Member Registrierungs Page
     */
    public onAdd(): void {
        if (this.id) {
            this.routerService.navigateSlideLeft(['member/register', this.id]);
        }
        else if (this.isOrganisation) {
            this.routerService.navigateSlideLeft(['member/register']);
        } else {
            this.routerService.navigateSlideLeft(['member/registerParent']);
        }
    }

}
