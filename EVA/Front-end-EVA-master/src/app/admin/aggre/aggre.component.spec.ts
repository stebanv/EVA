import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggreComponent } from './aggre.component';

describe('AggreComponent', () => {
  let component: AggreComponent;
  let fixture: ComponentFixture<AggreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
