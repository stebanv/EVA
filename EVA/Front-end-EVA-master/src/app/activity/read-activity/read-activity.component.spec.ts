import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadActivityComponent } from './read-activity.component';

describe('ReadActivityComponent', () => {
  let component: ReadActivityComponent;
  let fixture: ComponentFixture<ReadActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
