import { DpmLevel } from './../models/certificate.model';
import { Pipe, PipeTransform } from '@angular/core';
import {
  CertificateLevel,
  NonLinkedCertificateLevel,
} from '../models/certificate.model';

const chineseNameMapping = {
  [NonLinkedCertificateLevel.AGILE_COACH]: '敏捷教练',
  [NonLinkedCertificateLevel.JUNIOR_AGILE_COACH]: '初级敏捷教练',
  [NonLinkedCertificateLevel.TRAINEE_AGILE_COACH]: '见习敏捷教练',
  [CertificateLevel.ASSOCIATE_AGILE_COACH]: '初级敏捷教练',
  [CertificateLevel.PROFESSIONAL_AGILE_COACH]: '专业敏捷教练',
  [CertificateLevel.SENIOR_PROFESSIONAL_AGILE_COACH]: '资深敏捷教练',
  [CertificateLevel.MASTER_AGILE_COACH]: '大师级敏捷教练',
  [DpmLevel.JUNIOR]: '初阶数字产品经理',
  [DpmLevel.INTERMEDIATE]: '中阶数字产品经理',
  [DpmLevel.SENIOR]: '高阶数字产品经理',
};

@Pipe({
  name: 'chineseName',
})
export class ChineseNamePipe implements PipeTransform {
  transform(value: string): string {
    return chineseNameMapping[value];
  }
}
