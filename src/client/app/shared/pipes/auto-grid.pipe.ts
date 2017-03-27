import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'autogrid'
})
export class AutoGridPipe implements PipeTransform {
    transform(length: number, spec: string): any {
        let itemSpec = [];
        for (let i = 0; i < length; i++) {
            itemSpec.push(spec);
        }
        return itemSpec.join(',');
    }
}