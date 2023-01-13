import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonLinkedCertFormComponent } from './non-linked-cert-form.component';

xdescribe('NonLinkedCertFormComponent', () => {
  let component: NonLinkedCertFormComponent;
  let fixture: ComponentFixture<NonLinkedCertFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonLinkedCertFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonLinkedCertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
