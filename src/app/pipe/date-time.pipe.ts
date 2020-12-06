import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimePipe',
  pure: false
})
export class DateTimePipe implements PipeTransform {
  transform(date: Date) {
    return `${this.addMissingDigit(date.getFullYear())}-${(this.addMissingDigit(date.getMonth() + 1))}-${this.addMissingDigit(date.getDate())}T${this.addMissingDigit(date.getHours())}:${this.addMissingDigit(date.getMinutes())}`;
  }

  addMissingDigit(value) {
    return value.toString().length < 2 ? `0${value}` : value;
  }
}