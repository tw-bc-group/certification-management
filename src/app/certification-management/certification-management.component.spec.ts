import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CertificationManagementComponent } from './certification-management.component';
import {
  NzAvatarModule,
  NzButtonModule,
  NzDatePickerModule,
  NzEmptyModule,
  NzFormModule, NzIconModule, NzInputModule, NzLayoutModule, NzModalModule,
  NzPageHeaderModule, NzPaginationModule, NzRadioModule, NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';
import {CommonModule, registerLocaleData} from '@angular/common';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, FormControl, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {MovableDirective} from '../directives/movable.directive';
import {ZoomDirective} from '../directives/zoom.directive';
import {SafeResourceUrlPipe} from '../pipes/safe-resource-url.pipe';
import {PartnerLogoPipe} from '../pipes/partner-logo.pipe';
import {StringToHTMLPipe} from '../pipes/string-to-html.pipe';
import {ChineseNamePipe} from '../pipes/chinese-name.pipe';
import {EnglishNamePipe} from '../pipes/english-name.pipe';
import {DpmLevelNamePipe} from '../pipes/dpm-level-name.pipe';
import {CertificateTemplatePipe} from '../pipes/certificate-template.pipe';
import {CertificateDirectionPipe} from '../pipes/certificate-direction.pipe';
import {TraineePhotoUploadComponent} from '../trainee-photo-upload/trainee-photo-upload.component';
import {LogoPhotoUploadComponent} from '../logo-photo-upload/logo-photo-upload.component';
import {AddCompanyModalComponent} from '../add-company-modal/add-company-modal.component';
import {
  CertificationDetailOverlayComponent
} from '../certification-detail-overlay/certification-detail-overlay.component';
import {DebugElement} from '@angular/core';
import {CertificateTabs, CompanyRadios} from '../models/certificate.model';
import {CertificateFormComponent} from '../certificate-form/certificate-form.component';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);
xdescribe('CertificationManagementComponent', () => {
    let component: CertificationManagementComponent;
    let fixture: ComponentFixture<CertificationManagementComponent>;
    let debugElement: DebugElement;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [    CommonModule,
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
            ReactiveFormsModule,
            BrowserAnimationsModule,
            NzTableModule,
            NzPaginationModule,
            NzEmptyModule,
            NzAvatarModule,
            NzRadioModule, ],
            declarations: [CertificationManagementComponent,
              CertificateFormComponent,
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
              CertificateTemplatePipe,
              CertificateDirectionPipe,
              TraineePhotoUploadComponent,
              LogoPhotoUploadComponent,
              CertificationManagementComponent,
              AddCompanyModalComponent,
              CertificationDetailOverlayComponent, ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CertificationManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        debugElement = fixture.debugElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should go into linked certificate tab', () => {
      spyOn(component, 'onTabChange');
      spyOn(component, 'onSubTabChange');

      const nativeElement: HTMLElement = debugElement.nativeElement;
      const tabElements: HTMLElement = nativeElement.querySelector('.tabs span');
      tabElements.click();
      expect(tabElements.textContent).toEqual(' 证书发布 ');
      expect(component.onTabChange).toHaveBeenCalled();

      const linkedElement = debugElement.query(By.css('.linked-certificate'));
      const linkedBtn: HTMLButtonElement = linkedElement.nativeElement;
      linkedBtn.click();
      expect(linkedBtn.textContent).toEqual('上链证书 ');
      expect(component.onSubTabChange).toHaveBeenCalled();
    });

    xit('should issue certificate', () => {
      spyOn(component, 'issue');
      const formBuilder: FormBuilder = new FormBuilder();
      component.certificateForm = formBuilder.group({
        issuer: 'xuhemeng',
        lastName: 'lastname',
        firstName: 'firstname',
        subordinateCompany: CompanyRadios.THOUGHTWORKS
      });
      fixture.detectChanges();
      const issueBtn: HTMLButtonElement = debugElement.query(By.css('.issue-btn')).nativeElement;
      issueBtn.click();
      fixture.detectChanges();
      expect(component.issue).toHaveBeenCalled();
      expect(issueBtn.textContent).toEqual('颁发证书 ');
  });
});
