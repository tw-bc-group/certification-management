import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CertificationManagementComponent} from './certification-management.component';
import {
  NzAvatarModule,
  NzButtonModule,
  NzDatePickerModule,
  NzEmptyModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzModalModule,
  NzPageHeaderModule,
  NzPaginationModule, NzRadioModule,
  NzSelectModule,
  NzTableModule,
} from 'ng-zorro-antd';
import {CertFormComponent} from '../cert-form/cert-form.component';
import {NonLinkedCertFormComponent} from '../non-linked-cert-form/non-linked-cert-form.component';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {QueryPageComponent} from '../query-page/query-page.component';
import {TemplateTwComponent} from '../template-tw/template-tw.component';
import {TemplateTwSimpleComponent} from '../template-tw-simple/template-tw-simple.component';
import {TemplateCorporateComponent} from '../template-corporate/template-corporate.component';
import {TemplateCommunityComponent} from '../template-community/template-community.component';
import {TemplateUniversityComponent} from '../template-university/template-university.component';
import {TemplateJuniorDPMComponent} from '../template-junior-dpm/template-junior-dpm.component';
import {TemplateJuniorDPMSimpleComponent} from '../template-junior-dpm-simple/template-junior-dpm-simple.component';
import {TemplateTwCorComponent} from '../template-tw-cor/template-tw-cor.component';
import {TemplateTwCorSimpleComponent} from '../template-tw-cor-simple/template-tw-cor-simple.component';
import {TemplateNonLinkedTwAcComponent} from '../template-non-linked-tw-ac/template-non-linked-tw-ac.component';
import {NamePipe} from '../pipes/name.pipe';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MovableDirective} from '../directives/movable.directive';
import {ZoomDirective} from '../directives/zoom.directive';
import {SafeResourceUrlPipe} from '../pipes/safe-resource-url.pipe';
import {PartnerLogoPipe} from '../pipes/partner-logo.pipe';
import {StringToHTMLPipe} from '../pipes/string-to-html.pipe';
import {ChineseNamePipe} from '../pipes/chinese-name.pipe';
import {EnglishNamePipe} from '../pipes/english-name.pipe';
import {DpmLevelNamePipe} from '../pipes/dpm-level-name.pipe';
import {TraineePhotoUploadComponent} from '../trainee-photo-upload/trainee-photo-upload.component';
import {LogoPhotoUploadComponent} from '../logo-photo-upload/logo-photo-upload.component';
import {NZ_ICONS} from 'ng-zorro-antd/icon';
import {IconDefinition} from '@ant-design/icons-angular';
import {DeleteOutline, PlusOutline} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [PlusOutline, DeleteOutline];

@NgModule({
  declarations: [
    CertFormComponent,
    NonLinkedCertFormComponent,
    QueryPageComponent,
    TemplateTwComponent,
    TemplateTwSimpleComponent,
    TemplateCorporateComponent,
    TemplateCommunityComponent,
    TemplateUniversityComponent,
    TemplateJuniorDPMComponent,
    TemplateJuniorDPMSimpleComponent,
    TemplateTwCorComponent,
    TemplateTwCorSimpleComponent,
    TemplateNonLinkedTwAcComponent,
    NamePipe,
    MovableDirective,
    ZoomDirective,
    SafeResourceUrlPipe,
    PartnerLogoPipe,
    StringToHTMLPipe,
    ChineseNamePipe,
    EnglishNamePipe,
    DpmLevelNamePipe,
    TraineePhotoUploadComponent,
    LogoPhotoUploadComponent,
    CertificationManagementComponent,
  ],
  providers: [{provide: NZ_ICONS, useValue: icons}],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzDatePickerModule,
    NzIconModule,
    NzModalModule,
    NzMessageModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NzTableModule,
    NzPaginationModule,
    NzEmptyModule,
    NzAvatarModule,
    NzRadioModule,
  ]
})
export class CertificationManagementModule { }
