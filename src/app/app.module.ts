import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MovableDirective} from './directives/movable.directive';
import {ZoomDirective} from './directives/zoom.directive';
import {HttpClientModule} from '@angular/common/http';
import {SafeResourceUrlPipe} from './pipes/safe-resource-url.pipe';
import {TemplateTwComponent} from './template-tw/template-tw.component';
import {TemplateTwSimpleComponent} from './template-tw-simple/template-tw-simple.component';
import {TemplateCorporateComponent} from './template-corporate/template-corporate.component';
import {TemplateCommunityComponent} from './template-community/template-community.component';
import {TemplateUniversityComponent} from './template-university/template-university.component';
import {NamePipe} from './pipes/name.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CertFormComponent} from './cert-form/cert-form.component';
import {FormsModule} from '@angular/forms';
import {PartnerLogoPipe} from './pipes/partner-logo.pipe';
import {StringToHTMLPipe} from './pipes/string-to-html.pipe';
import {ChineseNamePipe} from './pipes/chinese-name.pipe';
import {DpmLevelNamePipe} from './pipes/dpm-level-name.pipe';
import {TemplateJuniorDPMComponent} from './template-junior-dpm/template-junior-dpm.component';
import {TemplateJuniorDPMSimpleComponent} from './template-junior-dpm-simple/template-junior-dpm-simple.component';
import {TemplateTwCorComponent} from './template-tw-cor/template-tw-cor.component';
import {TemplateTwCorSimpleComponent} from './template-tw-cor-simple/template-tw-cor-simple.component';
import {EnglishNamePipe} from './pipes/english-name.pipe';
import {
  NzButtonModule,
  NzDatePickerModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzModalModule,
  NzPageHeaderModule,
  NzSelectModule
} from 'ng-zorro-antd';
import {NZ_ICONS} from 'ng-zorro-antd/icon';
import {DeleteOutline, PlusOutline} from '@ant-design/icons-angular/icons';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {IconDefinition} from '@ant-design/icons-angular';
import {TemplateNonLinkedTwAcComponent} from './template-non-linked-tw-ac/template-non-linked-tw-ac.component';
import {NonLinkedCertFormComponent} from './non-linked-cert-form/non-linked-cert-form.component';
import {PhotoUploadComponent} from './photo-upload/photo-upload.component';
import {PasswordModalComponent} from './password-modal/password-modal.component';

registerLocaleData(zh);

const icons: IconDefinition[] = [PlusOutline, DeleteOutline];

@NgModule({
  declarations: [
    AppComponent,
    MovableDirective,
    ZoomDirective,
    SafeResourceUrlPipe,
    TemplateTwComponent,
    TemplateTwSimpleComponent,
    TemplateCorporateComponent,
    TemplateCommunityComponent,
    TemplateUniversityComponent,
    TemplateJuniorDPMComponent,
    TemplateJuniorDPMSimpleComponent,
    TemplateTwCorComponent,
    TemplateTwCorSimpleComponent,
    NamePipe,
    CertFormComponent,
    PartnerLogoPipe,
    StringToHTMLPipe,
    ChineseNamePipe,
    EnglishNamePipe,
    DpmLevelNamePipe,
    TemplateNonLinkedTwAcComponent,
    NonLinkedCertFormComponent,
    PhotoUploadComponent,
    PasswordModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzDatePickerModule,
    NzIconModule,
    NzModalModule,
  ],
  providers: [{provide: NZ_ICONS, useValue: icons}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
