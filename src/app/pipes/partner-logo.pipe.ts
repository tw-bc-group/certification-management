import { Pipe, PipeTransform } from '@angular/core';
import { github } from './logos/github';
import { huawei } from './logos/huawei';
import { pku } from './logos/pku';
import { oppo } from './logos/oppo';

const logos = {
  github,
  huawei,
  pku,
  oppo,
  CMGFintech: '/assets/images/招商金科logo.png'
};

@Pipe({
  name: 'partnerLogo',
})
export class PartnerLogoPipe implements PipeTransform {

  transform(value: string): string {
    return logos[value];
  }

}
