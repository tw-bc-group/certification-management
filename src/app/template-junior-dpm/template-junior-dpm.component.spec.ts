import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateJuniorDPMComponent } from './template-junior-dpm.component';

describe('TemplateTwComponent', () => {
  let component: TemplateJuniorDPMComponent;
  let fixture: ComponentFixture<TemplateJuniorDPMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateJuniorDPMComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateJuniorDPMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
