import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadProfileSchoolComponent } from './read-profile-school.component';

describe('ReadProfileSchoolComponent', () => {
  let component: ReadProfileSchoolComponent;
  let fixture: ComponentFixture<ReadProfileSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadProfileSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadProfileSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
