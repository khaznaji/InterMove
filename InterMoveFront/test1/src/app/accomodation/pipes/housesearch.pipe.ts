import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHouse'
})
export class SearchHousePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((value: any) => {
      return (value.title.toLocaleLowerCase().includes(args));
    })

  }
}