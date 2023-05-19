import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { MedifindService } from '../medifind.service';


@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {

  public product: any = [];
  public prodItems:any = [];
  prodItem:any = 0;
  cartDataNull:any
  public cartItem = true;
  public emptyCart = false;
  public id:number;
  cartNumber:number = 0;
  itemsCart:any = [];
  
  constructor(private api :CartService,
              // private dialogRef :MatDialogRef<AddCartComponent>,
              private medApi:MedifindService,
              private actRoute: ActivatedRoute
              ) { }

  ngOnInit(): void {
    
    this.prodDetails();
    this.total();
    this.totalDisc();
    this.cartDataNull = localStorage.getItem('cart')

    // this.actRoute.queryParams.subscribe(queryParam =>{
    //   console.log(queryParam,'hiii')
    //   this.id = queryParam.id;
    //   console.log(this.id,'hello')
    // })
    this.id=this.actRoute.snapshot.paramMap.get('id') as any;
    console.log(this.id);
    // id && this.medApi.getProducts(id).subscribe(res=>{
    //   console.log(res);
    //   this.id=res;
      
    // })
    this.getProduct();
    
  }

  getProduct(){
    this.medApi.getProducts(this.id).subscribe(res=>{
      this.product= res;
      console.log(this.product);
      console.log(this.id,'nknknk')
      let cartDataNull = localStorage.getItem('cart');
    if(cartDataNull == null){
      let storeDataGet : any = [];
      storeDataGet.push(this.product);
      localStorage.setItem('cart',JSON.stringify(storeDataGet));
      location.reload()
    }
    else{
      
      var Pid = this.product.id;
      let index:number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('cart') || '[]');
     
      for(let i=0; i<this.itemsCart.length; i++){
        if(parseInt(Pid) === parseInt(this.itemsCart[i].id)){
          this.itemsCart[i].quantity = this.product.quantity;
          index = i;
          
          break;
          
        }
      
      }
      
      if(index == -1){
        this.itemsCart.push(this.product);
        localStorage.setItem('cart',JSON.stringify(this.itemsCart));
        
      }
      else{
        localStorage.setItem('cart',JSON.stringify(this.itemsCart));
        
      }
    }
    })
    
  }

  // checkOut(){
  //   this.dialogRef.close();
  // }
  removeItem(item:any){
    this.api.removeCartItem(item) 
  }
  prodDetails(){
    if(localStorage.getItem('cart')){
      this.prodItems = JSON.parse(localStorage.getItem('cart') || '[]')
      console.log(this.prodItems);
    }
  }

  totalMrp:number = 0
  total(){
    if (localStorage.getItem('cart')){
      this.prodItems = JSON.parse(localStorage.getItem('cart') || '[]')
      this.totalMrp = this.prodItems.reduce(function(acc: any, val: any){
        return acc + (val.mrp*val.quantity);
      },0)
    }
  }
  discValue:number = 0
  totalDisc(){
    if(localStorage.getItem('cart')){
      this.prodItems = JSON.parse(localStorage.getItem('cart') || '[]')
      this.discValue = this.prodItems.reduce(function(acc: any, val: any){
        return acc + (val.quantity*val.mrp*val.discount/100);
      },0)
    }
  }
  incQty(id: any,quantity: any){
     for(let i=0; i<this.prodItems.length; i++){
      if(this.prodItems[i].id === id){
        if(quantity !=5)
        this.prodItems[i].quantity = parseInt(quantity) + 1;
      }
     }
     localStorage.setItem('cart', JSON.stringify(this.prodItems));
     this.total();
     this.totalDisc();
  }
  decQty(id: any,quantity: any){
    for(let i=0; i<this.prodItems.length; i++){
     if(this.prodItems[i].id === id){
      if(quantity !=1)
       this.prodItems[i].quantity = parseInt(quantity) - 1;
     }
    }
    localStorage.setItem('cart', JSON.stringify(this.prodItems));
    this.total();
    this.totalDisc();
 }
 removeAll(){ 
  localStorage.removeItem('cart');
  this.prodItems = []
  this.total();
  this.totalDisc();
 }
 singleRemove(prod:any){
  if(localStorage.getItem('cart')){
    this.prodItems = JSON.parse(localStorage.getItem('cart') || '[]')
    this.medApi.deleteCartProduct(prod).subscribe((res)=>{
      console.log(res)
      
    })
    for(let i=0; i<this.prodItems.length; i++){
      if(this.prodItems[i].id === prod){
        this.prodItems.splice(i, 1);
        localStorage.setItem('cart',JSON.stringify(this.prodItems));
        
      }
    }
    ;
    this.total();
    this.totalDisc();
  }
 }
 deleteCartItem(id:number){
  // debugger
  this.medApi.deleteCartProduct(id).subscribe((res)=>{
    console.log(res)
    this.cartList();
    // this.cartNumberFunc();
    location.reload();
  })
 }
 cartList(){
  this.medApi.getCartList().subscribe((res)=>{
    console.log(res,'cart')
    if(res){
      localStorage.setItem('cart',JSON.stringify(res))
    }
  })
}
 cartNumberFunc(){
  var cartValue = JSON.parse(localStorage.getItem('cart')|| '{}');
  this.cartNumber = cartValue.length;
  this.api.cartSubject.next(this.cartNumber);
  // console.log(this.cartNumber);
}
 
}

function id(id: any) {
  throw new Error('Function not implemented.');
}

