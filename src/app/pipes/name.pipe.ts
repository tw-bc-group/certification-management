import { Pipe, PipeTransform } from '@angular/core';
import { CertificateModel } from '../models/certificate.model';

@Pipe({
  name: 'name',
})
export class NamePipe implements PipeTransform {

  transform(value: CertificateModel): string {
    return `${value.firstName} ${value.lastName}`;
  }

}
