import { Adress } from '../../shared/models';

export class Parent {
    _id: String;
    adress: Adress;
    contractId: String;

    constructor() {
        this.adress = new Adress();
    }
}