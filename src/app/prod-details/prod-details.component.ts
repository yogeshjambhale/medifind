import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../add-cart/cart.model';
import { productModel } from '../add-product/product-model';
import { CartService } from '../cart.service';
import { MedifindService } from '../medifind.service';

@Component({
  selector: 'app-prod-details',
  templateUrl: './prod-details.component.html',
  styleUrls: ['./prod-details.component.css']
})
export class ProdDetailsComponent implements OnInit {

  productItems:any;
  cartItems: any = [];
  cartNumber:number = 0;
  prodItems : any  | productModel
  filteredOptions :any[];
  options:any = [];
  hndlQty:number = 1
  storeData: any = [];
  constructor(private api :MedifindService, 
              private cartApi : CartService,
              private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    // debugger
    let id=this.activeRoute.snapshot.paramMap.get('id') as any;
    console.log(id);
    id && this.api.getProducts(id).subscribe(res=>{
      // console.log(res);
      this.prodItems=res;
      
    })
   this.getData();
  }
  getData(){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    this.api.getCartList().subscribe((res)=>{
       if(res){
        localStorage.setItem('cart',JSON.stringify(res));
       }
    })
  }
  prodDetails(){
    if(localStorage.getItem('cart')){
      this.prodItems = JSON.parse(localStorage.getItem('cart') || '[]')
      console.log(this.prodItems);
    }
  }
  prodQty(val:string){
    if(this.hndlQty<5 && val==='plus'){
      this.hndlQty+=1
    }else if(this.hndlQty>1 && val==='min'){
      this.hndlQty-=1
    }

  }
 
  AddProduct(option:any){
  // debugger
  this.prodItems.quantity = this.hndlQty;
    let cartDataNull = localStorage.getItem('cart');
    if(cartDataNull == null && !localStorage.getItem('user')){
      let getStroreData: any = [];
      getStroreData.push(option);
      // console.log(getStroreData)
      localStorage.setItem('cart',JSON.stringify(getStroreData));
    }
    else{
      console.log('user loged in')
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.log(userId)
      let cartData={
        ...this.prodItems,
        userId,
        productId:this.prodItems.id
      }
      delete cartData.id;
      console.log(cartData);
      this.api.addCart(cartData).subscribe((res)=>{
        console.log(res);
        location.reload();
      })
      var id = option.id;
      let index:number = -1;
      this.cartItems = JSON.parse(localStorage.getItem('cart')|| '{}') ;
      for(let i=0; i<this.cartItems.length; i++){
        if(parseInt(id) === parseInt(this.cartItems[i].id)){
          this.cartItems[i].quantity = option.quantity;
          index = i;
          break;
        }
      }
      if(index == 1){
        this.cartItems.push(option);
        localStorage.setItem('cart',JSON.stringify(this.cartItems));
      }
      else{
        localStorage.setItem('cart',JSON.stringify(this.cartItems));
      }

    }
    this.cartNumberFunc();
   

  }

  cartNumberFunc(){
    var cartValue = JSON.parse(localStorage.getItem('cart')|| '{}');
    this.cartNumber = cartValue.length;
    this.cartApi.cartSubject.next(this.cartNumber);
    // console.log(this.cartNumber);
  }
  
  
}

