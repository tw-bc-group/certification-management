import { Pipe, PipeTransform } from '@angular/core';
import {CertificateLevel, NonLinkedCertificateLevel} from '../models/certificate.model';

const chineseNameMapping = {
  [NonLinkedCertificateLevel.AGILE_COACH]: '敏捷教练',
  [NonLinkedCertificateLevel.JUNIOR_AGILE_COACH]: '初级敏捷教练',
  [NonLinkedCertificateLevel.TRAINEE_AGILE_COACH]: '见习敏捷教练',
  [CertificateLevel.PROFESSIONAL_AGILE_COACH]: '专业敏捷教练',
  [CertificateLevel.ADVANCED_AGILE_COACH]: '高级敏捷教练',
  [CertificateLevel.MASTER_AGILE_COACH]: '大师级敏捷教练',
};

@Pipe({
  name: 'chineseName',
})
export class ChineseNamePipe implements PipeTransform {
  transform(value: string): string {
    return chineseNameMapping[value];
  }
}
