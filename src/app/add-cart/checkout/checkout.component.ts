import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { address, productModel } from 'src/app/add-product/product-model';
import { CartService } from 'src/app/cart.service';
import { MedifindService } from 'src/app/medifind.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  prodItems: any | productModel;
  address: any | address;
  totalMrp: number = 0;
  cartNumber: number = 0;
  order: any;
  orders: any = [];
  data: any = [];
  items: any;
  cartItems: any = [];
  prodData:any =[];
  cart:any
  id:any
  cartProduct:any
  adrss:any

   
  constructor(public dialog: MatDialog,
    private api: MedifindService,
    private cartApi: CartService,) { }

  ngOnInit(): void {
    this.total();
    this.totalDisc();
    this.getAddress()
    this.lessQty();
    // this.addAddress();
    this.api.getProduct().subscribe((res)=>{
      const data:any = res.find((a:any)=>{
        return a.id && a.product_name
      });
      console.log(data.id,'sasasa')
    })
  }

  openAdress() {
    this.dialog.open(FormComponent);
  }

  addAddress() {
    // debugger
    
    if(localStorage.getItem('cart')){
      this.prodItems = JSON.parse(localStorage.getItem('cart') || '{}');
      for(let i = 0; i<this.prodItems.length; i++){
        this.id = this.prodItems[i].id

        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this.cartProduct = {
          userId: userId,
          product_name: this.prodItems[i].product_name,
          drug_name: this.prodItems[i].drug_name,
          company: this.prodItems[i].company,
          manufacturer: this.prodItems[i].manufacturer,
          mrp: this.prodItems[i].mrp,
          discount: this.prodItems[i].discount,
          file: this.prodItems[i].file,
          qty: this.prodItems[i].qty,
          quantity: this.prodItems[i].quantity,
          productId: this.prodItems[i].productId,

        }
        
        this.api.postOrders(this.cartProduct).subscribe((res) => {
          if (res) {
            alert('order post successfuly')
          }
          console.log(res.id, 'i')
          let id = res.id;
          console.log(id);
          
    
        })
      }
    }
    
    if(localStorage.getItem('cart')){
      this.prodItems = JSON.parse(localStorage.getItem('cart') || '{}');
      for(let i = 0; i<this.prodItems.length; i++){
        this.id = this.prodItems[i].id

        
        this.cartProduct = {
          
          product_name: this.prodItems[i].product_name,
          drug_name: this.prodItems[i].drug_name,
          company: this.prodItems[i].company,
          manufacturer: this.prodItems[i].manufacturer,
          mrp: this.prodItems[i].mrp,
          discount: this.prodItems[i].discount,
          file: this.prodItems[i].file,
          qty: this.prodItems[i].qty,
          soldQty: this.prodItems[i].soldQty+this.prodItems[i].quantity,
          avlQty: this.prodItems[i].qty-this.prodItems[i].soldQty,
          id: this.prodItems[i].productId,

        }
        console.log(this.cartProduct,'fddfdf');
        console.log(this.prodItems[i].soldQty+this.prodItems[i].quantity,'ddddd')
        this.api.putProduct(this.cartProduct,this.prodItems[i].productId).subscribe((res)=>{
            console.log(res,'res')
          })
      }
    }
    
   
    let data = localStorage.getItem('cart');
    let id = data && JSON.parse(data);
    this.updateQty();
    this.deleteCartItem();
    localStorage.removeItem('cart')
  }
  deleteCartItem() {
    // debugger

    this.cartItems = JSON.parse(localStorage.getItem('cart') || '{}');
    for (let i = 0; i < this.cartItems.length; i++) {
      // this.orders.push(this.cartItems[i].id);

      this.api.deleteCartProduct(this.cartItems[i].id).subscribe((res) => {
        console.log(res)
        // location.reload();
      })
      // if (this.cartItems[i].id !== -1 ) {
      //   this.cartItems.splice(i, 1);
      //   localStorage.setItem('cart', JSON.stringify(this.cartItems));

      // }
    }
  }
 updateQty(){
   this.api.getProduct().subscribe((res)=>{
    console.log(res,'12')
    this.prodData =res;
    console.log(this.prodData,'ds')
  })
  
  this.cart = {
    // product_name: this.prodData.product_name,
    // drug_name: this.prodData.drug_name,
    // company: this.prodData.company,
    // manufacturer: this.prodData.manufacturer,
    // mrp: this.prodData.mrp,
    // discount: this.prodData.discount,
    // file: this.prodData.file,
    // qty: this.prodData.qty
  }
  console.log(this.cart,'hii');
  // this.cartItems = JSON.parse(localStorage.getItem('cart') || '{}');
  //   for (let i = 0; i < this.cartItems.length; i++) {
  // this.api.putProduct(cartData,this.cartItems[i].id).subscribe((res)=>{
  //   console.log(res,'res')
  // })
  // }
 }
  prodDetails() {
    if (localStorage.getItem('cart')) {
      this.prodItems = JSON.parse(localStorage.getItem('cart') || '{}')
      console.log(this.prodItems);
    }
  }

  total() {
    if (localStorage.getItem('cart')) {
      this.prodItems = JSON.parse(localStorage.getItem('cart') || '[]')
      this.totalMrp = this.prodItems.reduce(function (acc: any, val: any) {
        return acc + (val.mrp * val.quantity);
      }, 0)
    }
  }
  qty:number
  prod:any =[]
  lessQty(){
    // debugger
    if (localStorage.getItem('cart')) {
      this.prodItems = JSON.parse(localStorage.getItem('cart') || '[]')
      for (let i = 0; i < this.prodItems.length; i++) {
        this.prod.push(this.prodItems[i]);
        console.log(this.prod,'asa')
      this.qty = this.prod.reduce(function (acc: any, val: any) {
        return acc + (val.qty - val.quantity);
      }, 0)
      console.log(this.qty,'qt')
    }
    }
    
  }
  discValue: number = 0
  totalDisc() {
    if (localStorage.getItem('cart')) {
      this.prodItems = JSON.parse(localStorage.getItem('cart') || '[]')
      this.discValue = this.prodItems.reduce(function (acc: any, val: any) {
        return acc + (val.quantity * val.mrp * val.discount / 100);
      }, 0)
    }
  }
  getAddress() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    this.api.getAddress().subscribe(res => {
      console.log(res)
      this.address = res;
      console.log(this.address)
      this.adrss = this.address.filter((item: { userId: any; }) => item.userId == userId);
      console.log(this.data)
    })
  }
}
