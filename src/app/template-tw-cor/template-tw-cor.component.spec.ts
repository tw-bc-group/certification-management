import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTwCorComponent } from './template-tw-cor.component';

xdescribe('TemplateTwComponent', () => {
  let component: TemplateTwCorComponent;
  let fixture: ComponentFixture<TemplateTwCorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateTwCorComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTwCorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
