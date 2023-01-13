import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTwSimpleComponent } from './template-tw-simple.component';

xdescribe('TemplateTwComponent', () => {
  let component: TemplateTwSimpleComponent;
  let fixture: ComponentFixture<TemplateTwSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateTwSimpleComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTwSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
