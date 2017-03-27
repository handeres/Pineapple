import { Pipe, PipeTransform } from '@angular/core';
import { Member } from '../model';

/**
 * Pipe um die Member nach Vor- und Nachnamen zu filtern
 */
@Pipe({
  name: 'memberFilter'
})
export class MemberFilterPipe implements PipeTransform {

  transform(items: Member[], filterStrings: string): any {
    if (!filterStrings) {
      return items;
    }
    let filterStr = filterStrings.toLowerCase();

    return items.filter(item => item.name.toLocaleLowerCase().indexOf(filterStr) !== -1
     ||  item.surname.toLocaleLowerCase().indexOf(filterStr) !== -1
     || (item.name + ' ' + item.surname).toLocaleLowerCase().indexOf(filterStr) !== -1);
  }
}
