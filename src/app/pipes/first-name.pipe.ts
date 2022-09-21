import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName'
})
export class FirstNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.split(' ')[0];
  }

}
