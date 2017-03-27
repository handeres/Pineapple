import { Pipe, PipeTransform } from '@angular/core';
import { Parent } from '../model';

/**
 * Pipe um Parent nach Namen oder Adresse zu filtern
 */
@Pipe({
  name: 'parentFilter'
})
export class ParentFilterPipe implements PipeTransform {

  transform(items: Parent[], filterStrings: string): any {
    if (!filterStrings) {
      return items;
    }
    let filterStr = filterStrings.toLowerCase();

     return items.filter(item => item.adress.name.toLowerCase().indexOf(filterStr) !== -1
       || item.adress.surname.toLowerCase().indexOf(filterStr) !== -1
       || item.adress.city.toLowerCase().indexOf(filterStr) !== -1
       || item.adress.zipCode.toLowerCase().indexOf(filterStr) !== -1) ;
  }

}
