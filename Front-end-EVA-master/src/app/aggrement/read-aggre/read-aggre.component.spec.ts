import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAggreComponent } from './read-aggre.component';

describe('ReadAggreComponent', () => {
  let component: ReadAggreComponent;
  let fixture: ComponentFixture<ReadAggreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadAggreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAggreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
