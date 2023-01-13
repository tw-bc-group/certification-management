import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TraineePhotoUploadComponent} from './trainee-photo-upload.component';

xdescribe('PhotoUploadComponent', () => {
  let component: TraineePhotoUploadComponent;
  let fixture: ComponentFixture<TraineePhotoUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TraineePhotoUploadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineePhotoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
