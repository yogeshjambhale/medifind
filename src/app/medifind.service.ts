import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { address, productModel } from './add-product/product-model';

@Injectable({
  providedIn: 'root'
})
export class MedifindService {

 
  cartData = new EventEmitter<productModel[] | []>();
  constructor( private Http:HttpClient) { }
// products api
  postProduct(data:any){
    return this.Http.post<any>('http://localhost:8000/products',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getProduct(){
    return this.Http.get<any>('http://localhost:8000/products')
    .pipe(map((res:[])=>{
      return res;
    }))
  }
  getProducts(id:number){
    return this.Http.get<any>('http://localhost:8000/product/'+id +'/')
    .pipe(map((res)=>{
      return res;
    }))
  }
  putProduct(data:any,id:number){
    return this.Http.put<any>('http://localhost:8000/product/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteProduct(id:number){
    return this.Http.delete<any>('http://localhost:8000/product/'+id+'/')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  // users api

  signUpData(data:any){
    return this.Http.post<any>('http://localhost:8000/user-signup/',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  putPassword(data:any,id:number){
    return this.Http.put<any>('http://localhost:8000/user-signup-id/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getLoginData(){ 
    return this.Http.get<any>('http://localhost:8000/user-signup/')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getUsers(){
    return this.Http.get<any>('http://localhost:8000/user-signup/')
    .pipe(map((res:[])=>{
      return res;
    }))
  }
   
  deleteUsers(id:number){
    return this.Http.delete<any>('http://localhost:8000/user-signup-id/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

// admin api

  adminSignUpData(data:any){
    return this.Http.post<any>('http://localhost:8000/admin-signup/',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getAdminLoginData(){ 
    return this.Http.get<any>('http://localhost:8000/admin-signup/')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  // cart api

  addCart(data:any){
    return this.Http.post<productModel[]>('http://localhost:8000/cartdata/',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getCartList(){
    return this.Http.get<productModel[]>('http://localhost:8000/cartdata/')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteCartProduct(id:number){
    return this.Http.delete<any>('http://localhost:8000/cartdataid/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  // address api
  
  postAddress(data:any){
    return this.Http.post<productModel>('http://localhost:8000/address/',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getAddress(){
    return this.Http.get<any>('http://localhost:8000/address/' )
    .pipe(map((res)=>{
      return res;
    }))
  }

  // orders api

  postOrders(data:any){
    return this.Http.post<any>('http://localhost:8000/orders/',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getOrders(){
    return this.Http.get<any>('http://localhost:8000/orders/' )
    .pipe(map((res)=>{
      return res;
    }))
  }
  deleteOrders(id:number){
    return this.Http.delete<any>('http://localhost:8000/order/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  getorders(userId:number){
    return this.Http.get<any>('http://localhost:8000/order/'+userId, )
    .pipe(map((res)=>{
      return res;
    }))
  }
 
}
