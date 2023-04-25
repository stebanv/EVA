import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAggreComponent } from './create-aggre.component';

describe('CreateAggreComponent', () => {
  let component: CreateAggreComponent;
  let fixture: ComponentFixture<CreateAggreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAggreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAggreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
