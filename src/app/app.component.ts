import { Component } from '@angular/core';
import { LogInComponent } from './log-in/log-in.component';
// import {NestedTreeControl} from '@angular/cdk/tree';
// import {MatTreeNestedDataSource} from '@angular/material/tree';
import {MatDialog} from '@angular/material/dialog';

import { AddCartComponent } from './add-cart/add-cart.component';
import { CartService } from './cart.service';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'medifind';
  
  adminShow: any
  login:any
  adminlogin:any
  cart:any
  name:any
  constructor(
    public dialog: MatDialog,
    private cartApi:CartService,
    private router:Router
  ) { 
    this.cartApi.cartSubject.subscribe((data)=>{
      this.cartItems = data;
    })
  }

  ngOnInit(): void {
    this.cartItemFunc();

    this.adminShow = !localStorage.getItem('user') && !localStorage.getItem('admin')
    this.login = localStorage.getItem('user') 
    this.adminlogin = localStorage.getItem('admin')
    this.cart = !localStorage.getItem('admin')

    let user = localStorage.getItem('user');
    this.name = user && JSON.parse(user).name;
  }

 userlogOut(){
  localStorage.removeItem('user');
  localStorage.removeItem('cart')
  this.router.navigate(['/']);
  location.reload()
 }
 adminlogOut(){
  localStorage.removeItem('admin');
  this.router.navigate(['/']);
  location.reload()
 }
  openDialog() {
    this.dialog.open(LogInComponent);
    
  }
  openAdminDialog() {
    this.dialog.open(AdminLoginComponent);
    
  }
  // openDialogs() {
  //   this.dialog.open(AddCartComponent,{
  //     // width:'800px',
  //     // height:'500px'
  //   });
  // }
  cartItems:number = 0;
  cartItemFunc(){
    if(localStorage.getItem('cart') != null){
      var cartCount = JSON.parse(localStorage.getItem('cart') || '{}');
      this.cartItems = cartCount.length;
      // console.log(cartCount);
    }
  }
  
}
