import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Event } from '../model';

/**
 * Pipe um die Events nach Titeln zu filtern
 */
@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(items: Event[], filterStrings: string): any {
    if (!filterStrings) {
      return items;
    }
    let filterStr = filterStrings.toLowerCase();
    return items.filter(item => item.title.toLocaleLowerCase().indexOf(filterStr) !== -1
      ||  this.datePipe.transform(item.from, 'dd.MM.yyyy').toLocaleLowerCase().indexOf(filterStr) !== -1
      ||  this.datePipe.transform(item.to, 'dd.MM.yyyy').toLocaleLowerCase().indexOf(filterStr) !== -1
      ||  item.description.toLocaleLowerCase().indexOf(filterStr) !== -1);
  }
}
