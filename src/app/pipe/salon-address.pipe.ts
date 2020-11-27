import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salonAddress',
  pure: false
})
export class SalonAddressPipe implements PipeTransform {
  transform(salon: any[]) {
    let address = []
    if (salon["street"]) address.push(salon["street"])
    if (salon["district"]) address.push(salon["district"])
    if (salon["ward"]) address.push(salon["ward"])
    if (salon["province"]) address.push(salon["province"])
    return address.join(", ");
  }
}