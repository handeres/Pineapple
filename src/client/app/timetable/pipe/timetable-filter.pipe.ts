import { Pipe, PipeTransform } from '@angular/core';
import { TimetableDay } from '../model';

/**
 * Pipe um die Timetable zu filtern
 */
@Pipe({
  name: 'timetableFilter'
})
export class TimeTableFilterPipe implements PipeTransform {

  transform(items: TimetableDay[], filterStrings: string): any {
    if (!filterStrings) {
      return items;
    }
    let filterStr = filterStrings.toLowerCase();
    return items.filter(item => item.textMorning.toLocaleLowerCase().indexOf(filterStr) !== -1
      || item.textAfternoon.toLocaleLowerCase().indexOf(filterStr) !== -1
      || item.timeToMorning.toLocaleLowerCase().indexOf(filterStr) !== -1
      || item.timeToAfternoon.toLocaleLowerCase().indexOf(filterStr) !== -1
      || item.timefromMorning.toLocaleLowerCase().indexOf(filterStr) !== -1
      || item.timefromAfternoon.toLocaleLowerCase().indexOf(filterStr) !== -1
      || item.dayName.toLocaleLowerCase().indexOf(filterStr) !== -1)
  }
}
