import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MedifindService } from '../medifind.service';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from './add-item/add-item.component';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from '../cart.service';
import { productModel } from '../add-product/product-model';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  myControl = new FormControl('');
  options: any[] 
  filteredOptions :any[];
  formGorup: FormGroup;
  data! : MatTableDataSource<any>;
  prodoption: any;
  productObj : productModel = new productModel();
  cartItems: any = [];
  cartNumber:number = 0;

  constructor(private api:MedifindService, 
              private cartApi : CartService,
              private fb : FormBuilder,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );

    this.getAllProduct();
    this.initForm();
    
  }
  initForm(){
    this.formGorup = this.fb.group({
      'product' : ['']
    })
    this.formGorup.get('product')?.valueChanges.subscribe(Response =>{
       this.filterData(Response)
    })
  }
  filterData(enteredData: any){
    this.filteredOptions = this.options.filter(option =>{
      return option.toString().indexOf(enteredData) > -1
    })
  }
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  
  //   return this.options.filter(option => option.product_name.toLowerCase().includes(filterValue));
    
  // }  
  // getAllProduct(){
  //   this.api.getProducts().subscribe( response=>  {
  //     this.options = response;
  //     this.filteredOptions = response;
  //   })
  // }

  getAllProduct(){
    this.api.getProduct().subscribe(
      {
        next:(res:[])=>{
          this.filteredOptions = res;
          this.options = res;
          this.filteredOptions.map(option => option['product_name'])
         
          // console.log(this.options,'deko')
          this.filteredOptions.forEach((a:any) =>{
            Object.assign(a,{quantity:1})
          })
        }
      }
    )
  }
  
  displayFn(option: any) {
    // I want to get the full object and display the name
    return option.product_name;
  }
  AddProduct(option:any){
  
    let cartDataNull = localStorage.getItem('cart');
    if(cartDataNull == null && !localStorage.getItem('user')){
      let getStroreData: any = [];
      getStroreData.push(option);
      localStorage.setItem('cart',JSON.stringify(getStroreData));
    }
    else{
      console.log('user loged in')
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
      if(index == -1){
        this.cartItems.push(option);
        localStorage.setItem('cart',JSON.stringify(this.cartItems));
      }
      else{
        localStorage.setItem('cart',JSON.stringify(this.cartItems));
      }

    }
    this.cartNumberFunc();
    // localStorage.setItem('cart',JSON.stringify(option))
    // this.dialog.open(AddItemComponent)
    // this.cartApi.addToCart(option).subscribe(res=>{
      // this.prodoption = res;
    // })
    // console.log(option)

  }

  cartNumberFunc(){
    var cartValue = JSON.parse(localStorage.getItem('cart')|| '{}');
    this.cartNumber = cartValue.length;
    this.cartApi.cartSubject.next(this.cartNumber);
    // console.log(this.cartNumber);
  }
}
