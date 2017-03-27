import { Pipe, PipeTransform } from '@angular/core';
import { Group } from '../model';

/**
 * Pipe um die Gruppen nach Namen und Level zu filtern
 */
@Pipe({
  name: 'groupFilter'
})
export class GroupFilterPipe implements PipeTransform {

  transform(items: Group[], filterStrings: string): any {
    if (!filterStrings) {
      return items;
    }
    let filterStr = filterStrings.toLowerCase();
    return items.filter(item => item.name.toLocaleLowerCase().indexOf(filterStr) !== -1
      || item.level.toLocaleLowerCase().indexOf(filterStr) !== -1);
  }
}
