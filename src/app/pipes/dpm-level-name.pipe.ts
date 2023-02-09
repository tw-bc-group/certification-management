import { DpmLevel } from './../models/certificate.model';
import { Pipe, PipeTransform } from '@angular/core';
import { dpmLevelNameMapping } from '../models/certificate.model';
import {find} from 'lodash';
import {get} from 'lodash';

@Pipe({
  name: 'dpmLevelName',
})
export class DpmLevelNamePipe implements PipeTransform {
  transform(value: string): string {
    return get(find(DpmLevel, { value }), 'label');
  }
}
