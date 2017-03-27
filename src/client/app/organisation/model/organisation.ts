import { Adress } from '../../shared/models';

class OrganisationForm {
    name: string = '';
}
export class Organisation {
    _id: string;
    name: string = '';
    adress: Adress;
    form: OrganisationForm;

    constructor() {
      this.adress = new Adress();
      this.form = new OrganisationForm();
    }
}
