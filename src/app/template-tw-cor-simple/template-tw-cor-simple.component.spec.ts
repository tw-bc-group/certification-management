import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTwCorSimpleComponent } from './template-tw-cor-simple.component';

describe('TemplateTwComponent', () => {
  let component: TemplateTwCorSimpleComponent;
  let fixture: ComponentFixture<TemplateTwCorSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateTwCorSimpleComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTwCorSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
