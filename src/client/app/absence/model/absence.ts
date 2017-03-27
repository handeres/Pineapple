

export class Member {
    _id: string;
    name: string = '';
    surname: string = '';
}

export class Absence {
    _id: string;
    memberId: string;
    member: string = '';
    name: string = '';
    surname: string = '';
    reason: string = '';
    hasOtherReason: boolean = false;
    otherReason: string= '';
    fromDate: Date = new Date();
    untilDate: Date = new Date();
}

export class AbsenceForm {
    absence: Absence;
    reasons: Array<string>;
    members: Array<Member>;

    constructor() {
        this.absence = new Absence();
        this.reasons = new Array<string>();
        this.members= new Array<Member>();
    }
}
