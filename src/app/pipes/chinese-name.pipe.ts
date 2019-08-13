import { Pipe, PipeTransform } from '@angular/core';

const chineseNameMapping = {
  'AGILE COACH': '敏捷教练',
  'ADVANCED AGILE COACH': '高级敏捷教练',
  'MASTER AGILE COACH': '大师级敏捷教练',
};

@Pipe({
  name: 'chineseName',
})
export class ChineseNamePipe implements PipeTransform {
  transform(value: string): string {
    return chineseNameMapping[value];
  }
}
