import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTwComponent } from './template-tw.component';

describe('TemplateTwComponent', () => {
  let component: TemplateTwComponent;
  let fixture: ComponentFixture<TemplateTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateTwComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
