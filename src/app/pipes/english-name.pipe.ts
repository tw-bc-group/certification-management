import { Pipe, PipeTransform } from '@angular/core';
import { CertificateLevel } from '../models/certificate.model';

const englishNameMapping = {
  [CertificateLevel.ASSOCIATE_AGILE_COACH]: 'Associate Agile Coach',
  [CertificateLevel.PROFESSIONAL_AGILE_COACH]: 'Professional Agile Coach',
  [CertificateLevel.SENIOR_PROFESSIONAL_AGILE_COACH]: 'Senior Professional Agile Coach',
  [CertificateLevel.MASTER_AGILE_COACH]: 'Master Agile Coach',
};

@Pipe({
  name: 'englishName',
})
export class EnglishNamePipe implements PipeTransform {
  transform(value: string): string {
    return englishNameMapping[value];
  }
}
