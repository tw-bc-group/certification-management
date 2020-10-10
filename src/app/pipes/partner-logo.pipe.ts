import { Pipe, PipeTransform } from '@angular/core';
import { github } from './logos/github';
import { huawei } from './logos/huawei';
import { pku } from './logos/pku';
import { oppo } from './logos/oppo';
import { CMGFintech } from './logos/CMGFintech';
import { ABC } from './logos/ABC';

const logos = {
  github,
  huawei,
  pku,
  oppo,
  CMGFintech,
  ABC
};

@Pipe({
  name: 'partnerLogo',
})
export class PartnerLogoPipe implements PipeTransform {

  transform(value: string): string {
    return logos[value];
  }

}
