
const TIME_FROM_MORNING = '8:00';
const TIME_TO_MORNING = '11:30';
const TIME_FROM_AFTERNOON = '13:30';
const TIME_TO_AFTERNOON = '16:30';

export class TimetableDay {
    _id: string = '';
    dayName: string = '';
    timefromMorning: string = '';
    timeToMorning :string = '';
    textMorning :string = '';
    timefromAfternoon: string = '';
    timeToAfternoon :string = '';
    textAfternoon :string = '';
}

export class Timetable {
    _id: string = '';
    groupId: string = '';
    days: Array<TimetableDay>;

    constructor() {
        this.days = Array<TimetableDay>();
    }
}

/* Leider wegen Telerik Formular notwendig. Dies kann keine Array darstellen */
export class TimetableForm {
    monday_timefromMorning: string = TIME_FROM_MORNING;
    monday_timeToMorning: string = TIME_TO_MORNING;
    monday_textMorning: string = '';
    monday_timefromAfternoon: string = TIME_FROM_AFTERNOON;
    monday_timeToAfternoon: string = TIME_TO_AFTERNOON;
    monday_textAfternoon: string = '';

    tuesday_timefromMorning: string = TIME_FROM_MORNING;
    tuesday_timeToMorning: string = TIME_TO_MORNING;
    tuesday_textMorning: string = '';
    tuesday_timefromAfternoon: string = TIME_FROM_AFTERNOON;
    tuesday_timeToAfternoon: string = TIME_TO_AFTERNOON;
    tuesday_textAfternoon: string = '';

    wednesday_timefromMorning: string = TIME_FROM_MORNING;
    wednesday_timeToMorning: string = TIME_TO_MORNING;
    wednesday_textMorning: string = '';
    wednesday_timefromAfternoon: string = TIME_FROM_AFTERNOON;
    wednesday_timeToAfternoon: string = TIME_TO_AFTERNOON;
    wednesday_textAfternoon: string = '';

    thursday_timefromMorning: string = TIME_FROM_MORNING;
    thursday_timeToMorning: string = TIME_TO_MORNING;
    thursday_textMorning: string = '';
    thursday_timefromAfternoon: string = TIME_FROM_AFTERNOON;
    thursday_timeToAfternoon: string = TIME_TO_AFTERNOON;
    thursday_textAfternoon: string = '';

    friday_timefromMorning: string = TIME_FROM_MORNING;
    friday_timeToMorning: string = TIME_TO_MORNING;
    friday_textMorning: string = '';
    friday_timefromAfternoon: string = TIME_FROM_AFTERNOON;
    friday_timeToAfternoon: string = TIME_TO_AFTERNOON;
    friday_textAfternoon: string = '';
}
