import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameInitials',
  standalone: true,
})
export class NameInitials implements PipeTransform {
  transform(name: string) {
    const nameList = name.split(' ');
    const firstLetter = nameList[0].split('')[0];
    const secondLetter = nameList[1].split('')[0];

    return firstLetter + secondLetter;
  }
}
