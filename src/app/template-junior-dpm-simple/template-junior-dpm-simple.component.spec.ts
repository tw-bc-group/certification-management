import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateJuniorDPMSimpleComponent } from './template-junior-dpm-simple.component';

describe('TemplateTwComponent', () => {
  let component: TemplateJuniorDPMSimpleComponent;
  let fixture: ComponentFixture<TemplateJuniorDPMSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateJuniorDPMSimpleComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateJuniorDPMSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
