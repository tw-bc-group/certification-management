import { Pipe, PipeTransform } from '@angular/core';
import {CertificateDirectionOptions} from '../models/certificate.model';
import {find} from 'lodash';
import {get} from 'lodash';

@Pipe({
  name: 'certificateDirection',
})
export class CertificateDirectionPipe implements PipeTransform {
  transform(value: string): string {
    return get(find(CertificateDirectionOptions, { value }), 'label');
  }
}
