import { Pipe, PipeTransform } from '@angular/core';
import { dpmLevelNameMapping } from '../models/certificate.model';

@Pipe({
  name: 'dpmLevelName',
})
export class DpmLevelNamePipe implements PipeTransform {
  transform(value: string): string {
    return [dpmLevelNameMapping[value], '数字产品经理'].join('');
  }
}
