import { Pipe, PipeTransform } from '@angular/core';

const englishNameMapping = {
  'AGILE COACH': 'Professional Agile Coach',
  'ADVANCED AGILE COACH': 'Advanced Agile Coach',
  'MASTER AGILE COACH': 'Master Agile Coach',
};

@Pipe({
  name: 'englishName',
})
export class EnglishNamePipe implements PipeTransform {
  transform(value: string): string {
    return englishNameMapping[value];
  }
}
