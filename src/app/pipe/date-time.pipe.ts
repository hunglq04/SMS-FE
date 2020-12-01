import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimePipe',
  pure: false
})
export class DateTimePipe implements PipeTransform {
  transform(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`;
    
  }
}