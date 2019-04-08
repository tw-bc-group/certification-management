import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCorporateComponent } from './template-corporate.component';

describe('TemplateCorporateComponent', () => {
  let component: TemplateCorporateComponent;
  let fixture: ComponentFixture<TemplateCorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateCorporateComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
