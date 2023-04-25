import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAggreComponent } from './update-aggre.component';

describe('UpdateAggreComponent', () => {
  let component: UpdateAggreComponent;
  let fixture: ComponentFixture<UpdateAggreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAggreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAggreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
