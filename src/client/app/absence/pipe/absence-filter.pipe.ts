import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Absence } from '../model';

/**
 * Pipe um die Absenzen nach Namen, Datum und Gründe zu filtern
 */
@Pipe({
  name: 'absenceFilter'
})
export class AbsenceFilterPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(items: Absence[], filterStrings: string): any {
    if (!filterStrings) {
      return items;
    }
    let filterStr = filterStrings.toLowerCase();
    return items.filter(item => item.member.toLocaleLowerCase().indexOf(filterStr) !== -1
        ||  this.datePipe.transform(item.untilDate, 'dd.MM.yyyy').toLocaleLowerCase().indexOf(filterStr) !== -1
        ||  this.datePipe.transform(item.fromDate, 'dd.MM.yyyy').toLocaleLowerCase().indexOf(filterStr) !== -1
        ||  item.reason.toLocaleLowerCase().indexOf(filterStr) !== -1);
  }
}
