import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCommunityComponent } from './template-community.component';

describe('TemplateCommunityComponent', () => {
  let component: TemplateCommunityComponent;
  let fixture: ComponentFixture<TemplateCommunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateCommunityComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
