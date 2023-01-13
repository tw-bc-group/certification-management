import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateNonLinkedTwAcComponent } from './template-non-linked-tw-ac.component';

xdescribe('TemplateNonLinkedTwAcComponent', () => {
  let component: TemplateNonLinkedTwAcComponent;
  let fixture: ComponentFixture<TemplateNonLinkedTwAcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateNonLinkedTwAcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateNonLinkedTwAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
