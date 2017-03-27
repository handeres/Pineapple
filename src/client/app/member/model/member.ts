
export class Group {
    _id: string;
    name: string = '';
}

export class Member {
    _id: string;
    name: string = '';
    surname: string = '';
    callingName: string = '';
    birthday: Date = new Date();
    groupId: string = '';
    parentId: string = '';
    contractId: string = '';
    groupName: string = '';
    hasAbsence: boolean = false;
    imageSource: any = null;

    constructor() {
        /* Durchschnittliches Alter bei Kindrgarten Eintritt */
        this.birthday.setFullYear(new Date().getFullYear() - 4);
    }
}

export class MemberForm {
    member: Member;
    groups: Array<Group>;

    constructor() {
        this.member = new Member();
        this.groups = new Array<Group>();
    }
}
export class MemberRegister {
    name: string = '';
    surname: string = '';
    groupName: string = '';
}