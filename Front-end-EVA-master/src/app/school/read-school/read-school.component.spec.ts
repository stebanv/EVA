import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSchoolComponent } from './read-school.component';

describe('ReadSchoolComponent', () => {
  let component: ReadSchoolComponent;
  let fixture: ComponentFixture<ReadSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
