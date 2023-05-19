import { Component, OnInit } from '@angular/core';
import { MedifindService } from '../medifind.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  cartItems: any = [];
  orders:any = [];
  constructor(private api: MedifindService,) { }

  ngOnInit(): void {
    this.getOrders();
  }

 getOrders(){
  this.cartItems = JSON.parse(localStorage.getItem('cart')|| '{}') ;
  for(let i=0; i<this.cartItems.length; i++){
    this.orders.push(this.cartItems[i].id);
  }
  console.log(this.orders,'o');
 }
 
}
