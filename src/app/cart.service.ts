import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from './add-cart/cart.model';
import { productModel } from './add-product/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartSubject = new Subject<any>();
  // public cartItemList : any =[]
  // public productList = new BehaviorSubject<any>([])
  private api : "http://localhost:3000/cart-data"
  
  constructor(private http : HttpClient) { }

  getAllProduct(id:string): Observable<Cart[]>{
    // return this.productList.asObservable();
    return this.http.get<Cart[]>(this.api+id)

  }
  setProduct(product:any){
    // this.cartItemList.push(...product);
    // this.productList.next(product);
  }
  // addToCart(product:productModel): Observable<any>{
    // this.cartItemList.push(product);
    // this.productList.next(this.cartItemList);
    // console.log(this.cartItemList);
    // return this.http.post<any>(this.api,{product})
    // .pipe(map((res:any)=>{
    //   return res;
      
    // }))
    
  // }
  addToCart(data:any){
    return this.http.post<any>('http://localhost:3000/posts',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  removeCartItem(product:any){
    // this.cartItemList.map((a:any,index:any) =>{
    //   if(product.id==a.id){
    //     this.cartItemList.splice(index,1);
    //   }
    // })
  }

}
