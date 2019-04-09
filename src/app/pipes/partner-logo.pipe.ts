import { Pipe, PipeTransform } from '@angular/core';
import { github } from './logos/github';
import { huawei } from './logos/huawei';
import { pku } from './logos/pku';

const logos = {
  github,
  huawei,
  pku,
};

@Pipe({
  name: 'partnerLogo',
})
export class PartnerLogoPipe implements PipeTransform {

  transform(value: string): string {
    return logos[value];
  }

}
