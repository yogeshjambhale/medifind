import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { generate } from 'rxjs';
import { Cart } from '../add-cart/cart.model';
import { productModel } from '../add-product/product-model';
import { CartService } from '../cart.service';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { MedifindService } from '../medifind.service';
import { SignupComponent } from '../signup/signup.component';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { OrderSuccessMessageComponent } from '../add-cart/checkout/order-success-message/order-success-message.component';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  
  email = new FormControl('', [Validators.required, Validators.email]);
  public otp = false
  public login = true
  hide = true
  cartNumber:number = 0;
  cart:any
  data:any
  cartData = new EventEmitter<productModel[] | []>();

  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  // MobileFormControl = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage(){
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('minLength') ? 'Password Must Have 6 Caracters' : '';
  }
  
  // formValue:FormGroup|any;
  formgroup:FormGroup|any

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public dialog : MatDialog,
              private api:MedifindService,
              private http:HttpClient,
              private formbuilder:FormBuilder,
              private dialogRef :MatDialogRef<LogInComponent>,
              private cartApi : CartService,
              private router:Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  //  this.formValue = new FormGroup({
  //   "name": new FormControl(),
  //   "emails": new FormControl(),
  //   "passwords": new FormControl(),
    
  //  })
  //  this.signupData();
  this.formgroup = this.formbuilder.group({
    "password": [''],
    "email": ['']
  })
  console.log(this.formgroup.value)
  }

  openDialog() {
    this.dialog.open(ForgetPasswordComponent);
    
  }

  

  loginData(){
    this.api.getLoginData().subscribe(res=>{
      const user = res.find((a:any)=>{
      return a.email == this.formgroup.value.email && a.password == this.formgroup.value.password
      })
      if(user){
        this.openLoginSuccess();
        // location.reload()
        if(res){
          localStorage.setItem('user',JSON.stringify(user))
        }
        this.localCartToRemoteCart();
        this.cartNumberFunc();
         this.dialogRef.close();
         this.router.navigate(['/']);
         location.reload();
      }else{
        this.openLoginFail();
      }
    })
  }
  generateOtp(){
    if(this.login==true){
      this.login=false;
      this.otp=true;
    }
  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('cart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(data){
      let cartDataList = JSON.parse(data);
      

      cartDataList.forEach((product:any,index:any) => {
        let cartData={
          ...product,
          productId: product.id,
          userId,
        };
       delete cartData.id;
       setTimeout(() =>{
        this.api.addCart(cartData).subscribe((res)=>{
          if(res){
            alert('item stored in db')
          }
        })
        if(cartDataList.length===index+1){
          localStorage.removeItem('cart');
        }
       },500)
      });
      
    }
    this.cartList();
    this.cartNumberFunc();
  }
  cartList(){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    this.api.getCartList().subscribe((res)=>{
      console.log(res,'cart')
      this.cart= res;
      this.data = this.cart.filter((item: { userId: any; }) => item.userId == userId)
      if(this.data){
        localStorage.setItem('cart',JSON.stringify(this.data))
      }
    })
  }
  cartNumberFunc(){
    var cartValue = JSON.parse(localStorage.getItem('cart')|| '{}');
    this.cartNumber = cartValue.length;
    this.cartApi.cartSubject.next(this.cartNumber);
    // console.log(this.cartNumber);
  }
  openLoginSuccess() {
    this._snackBar.open('Login Sucessfully!!', 'Done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
 
  }
  openLoginFail() {
    this._snackBar.open('User not found!!', 'Done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
