import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileSchoolComponent } from './update-profile-school.component';

describe('UpdateProfileSchoolComponent', () => {
  let component: UpdateProfileSchoolComponent;
  let fixture: ComponentFixture<UpdateProfileSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfileSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
