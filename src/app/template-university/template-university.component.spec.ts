import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateUniversityComponent } from './template-university.component';

describe('TemplateUniversityComponent', () => {
  let component: TemplateUniversityComponent;
  let fixture: ComponentFixture<TemplateUniversityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateUniversityComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
