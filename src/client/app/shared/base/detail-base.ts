import { RouterService, UsersService } from '../../shared/services';
import { Base } from './';

/**
 * Basis Klasse für eine Detail und Register Komponente.
 *
 */
export abstract class DetailBase<Item> extends Base {
    /**
     *  Id der Absence für editier Mode
     */
    protected id: string;
    /**
     * TRUE wenn der editier Mode aktiv ist
     */
    protected isEditMode: boolean;

    constructor(protected routerService: RouterService,
                protected usersService: UsersService) {
        super(usersService,
              routerService);
    }
}
