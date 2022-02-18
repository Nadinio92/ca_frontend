import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numericList'
})
export class NumericListPipe implements PipeTransform {

  transform(value: string[]): string {
    let result = "";
    for (let i = 0; i < value.length; i++) {
      result += `/ ${value[i]} `;
    }
    return result.substring(1);
  }

}
