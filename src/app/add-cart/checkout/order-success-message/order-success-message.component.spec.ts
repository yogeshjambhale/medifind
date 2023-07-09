import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuccessMessageComponent } from './order-success-message.component';

describe('OrderSuccessMessageComponent', () => {
  let component: OrderSuccessMessageComponent;
  let fixture: ComponentFixture<OrderSuccessMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSuccessMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
