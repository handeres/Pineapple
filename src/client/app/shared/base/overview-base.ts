import { ListViewEventData } from 'nativescript-telerik-ui-pro/listview';

import { DialogService, DataService, RouterService, UsersService } from '../../shared/services';
import { Base } from './';


export class IdItem {
    _id: string;
}

/**
 * Basis Klasse für eine Overview Komponente.
 *
 */
export abstract class OverviewBase<Item extends IdItem> extends Base {

    /**
     *  Array von Member
     */
    public items: Array<Item> = [];
    /**
     * Filter siehe {@link AbsenceFilterPipe}
     */
    public filter: string;
    /**
     * Letzer selektierter Absenz index
     */
    private lastSelectedItemIndex: number;
    /**
     * Bestätigunstext für das löschen eines Item
     */
    private deleteConfirmText: string;

    constructor(protected dialogService: DialogService,
                protected routerService: RouterService,
                protected usersService: UsersService,
                protected itemService: DataService<Item>) {
        super(usersService,
              routerService);
    }

    /**
     * Setzen des Löschen bestätigungs text
     * @param text
     */
    protected setDeleteConfirmText(text: string) {
        this.deleteConfirmText = text;
    }

    /**
     * Löscht eines Item
     * @param {string} id  Id des Member
     */
    public onDelete(id: string, ): void {
        let context = this;
        this.dialogService.confirmDelete(this.deleteConfirmText).then(function (result) {
            if (result) {
                context.subscriptions.push(context.itemService.deleteById(id).subscribe(res => {
                    // Find and remove item from item array
                    let deletedItem = context.items.filter((item: Item) => item._id === id)[0];
                    let deletedItemIndex = context.items.indexOf(deletedItem);
                    if (deletedItemIndex !== -1) {
                        context.items.splice(deletedItemIndex, 1);
                    }
                }));
            }
        });
    }

    /**
     * Event beim starten des Swipe
     * @param args
     */
    public onSwipeCellStarted(args: ListViewEventData) {
        let swipeLimits = args.data.swipeLimits;
        swipeLimits.left = 0;
    }

    /**
     * Swipe event ist beendent
     * @param args
     */
    public onSwipeCellFinished(args: ListViewEventData) {
        this.lastSelectedItemIndex = args.itemIndex;
    }

    /**
     *  Event beim swipen nach recht
     * @param args
     */
    public onRightSwipeClick(args: ListViewEventData) {
        let item = this.items[this.lastSelectedItemIndex];
        if (item) {
            this.onDelete(item._id);
        }
    }

    /**
     *  Wird aufgerufen wenn ein neues Item hinzugefügt wird
     */
    public abstract onAdd(): void

    /**
     * Wird aufgerufen wenn das Item in der Liste selektiert wurde
     * @param args
     */
    public abstract onItemSelected(args: ListViewEventData): void
}