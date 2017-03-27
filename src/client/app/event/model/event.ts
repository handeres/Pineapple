export class Event {
    _id: string;
    title: string = '';
    description: string = '';
    from: Date = new Date();
    timeFrom: string = '';
    to: Date = new Date();
    timeTo: string = '';
    organisationId: string;
    createUserId: string;
    createDateTime: Date;
}
