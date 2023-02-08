import { Pipe, PipeTransform } from '@angular/core';
import { CertificateTemplateOptions } from '../models/certificate.model';
import {find} from 'lodash';
import {get} from 'lodash';

@Pipe({
  name: 'certificateTemplate',
})
export class CertificateTemplatePipe implements PipeTransform {
  transform(value: string): string {
    return get(find(CertificateTemplateOptions, { value }), 'label');
  }
}
