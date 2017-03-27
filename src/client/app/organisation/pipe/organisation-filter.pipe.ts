import { Pipe, PipeTransform } from '@angular/core';
import { Organisation } from '../model';

/**
 * Pipe um die Organisation nach Namen zu filtern
 */
@Pipe({
  name: 'organisationFilter'
})
export class OrganisationFilterPipe implements PipeTransform {

  transform(items: Organisation[], filterStrings: string): any {
    if (!filterStrings) {
      return items;
    }
    let filterStr = filterStrings.toLowerCase();

    return items.filter(item => item.name.toLocaleLowerCase().indexOf(filterStr) !== -1
        || item.adress.surname.toLowerCase().indexOf(filterStr) !== -1
        || item.adress.city.toLowerCase().indexOf(filterStr) !== -1
        || item.adress.zipCode.toLowerCase().indexOf(filterStr) !== -1);
  }

}
