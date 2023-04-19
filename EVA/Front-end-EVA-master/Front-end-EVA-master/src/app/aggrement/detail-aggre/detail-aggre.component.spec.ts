import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAggreComponent } from './detail-aggre.component';

describe('DetailAggreComponent', () => {
  let component: DetailAggreComponent;
  let fixture: ComponentFixture<DetailAggreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAggreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAggreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
