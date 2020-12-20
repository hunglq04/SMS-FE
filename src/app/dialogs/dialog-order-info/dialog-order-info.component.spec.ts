import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderInfoComponent } from './dialog-order-info.component';

describe('DialogOrderInfoComponent', () => {
  let component: DialogOrderInfoComponent;
  let fixture: ComponentFixture<DialogOrderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOrderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
