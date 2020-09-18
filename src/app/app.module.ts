import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovableDirective } from './directives/movable.directive';
import { ZoomDirective } from './directives/zoom.directive';
import { HttpClientModule } from '@angular/common/http';
import { SafeResourceUrlPipe } from './pipes/safe-resource-url.pipe';
import { TemplateTwComponent } from './template-tw/template-tw.component';
import { TemplateTwSimpleComponent } from './template-tw-simple/template-tw-simple.component';
import { TemplateCorporateComponent } from './template-corporate/template-corporate.component';
import { TemplateCommunityComponent } from './template-community/template-community.component';
import { TemplateUniversityComponent } from './template-university/template-university.component';
import { NamePipe } from './pipes/name.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CertFormComponent } from './cert-form/cert-form.component';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatProgressSpinnerModule,
  MatSelectModule,
} from '@angular/material';
import { PartnerLogoPipe } from './pipes/partner-logo.pipe';
import { StringToHTMLPipe } from './pipes/string-to-html.pipe';
import { ChineseNamePipe } from './pipes/chinese-name.pipe';
import { TemplateJuniorDPMComponent } from './template-junior-dpm/template-junior-dpm.component';
import { TemplateJuniorDPMSimpleComponent } from './template-junior-dpm-simple/template-junior-dpm-simple.component';
import { TemplateTwCorComponent } from './template-tw-cor/template-tw-cor.component';
import { TemplateTwCorSimpleComponent } from './template-tw-cor-simple/template-tw-cor-simple.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
