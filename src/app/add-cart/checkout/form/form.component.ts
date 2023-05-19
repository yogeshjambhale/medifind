import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { address, productModel } from 'src/app/add-product/product-model';
import { MedifindService } from 'src/app/medifind.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  formValue !: FormGroup;
  prodItems:any = 0;
  address:address= new address();
  constructor(private api:MedifindService,
              private formbuilder:FormBuilder,
              private dialogRef :MatDialogRef<FormComponent>) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name : ['',Validators.required],
      address : ['',Validators.required],
      city : ['',Validators.required],
      state : ['',Validators.required],
      pincode :['',Validators.required],
      mobile :['',Validators.required],
      

    });
    this.prodDetails()
  }

  
  addAddress(){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(this.formValue.valid){
      this.address.name = this.formValue.value.name;
      this.address.address = this.formValue.value.address;
      this.address.city = this.formValue.value.city;
      this.address.state = this.formValue.value.state;
      this.address.pincode = this.formValue.value.pincode;
      this.address.mobile = this.formValue.value.mobile;
      this.address.userId = userId
    }
    
    
    this.api.postAddress(this.address).subscribe((res)=>{
      if(res){
        alert('address post successfuly')
        this.formValue.reset();
        this.dialogRef.close();
      }
    })
  }
  prodDetails(){
    if(localStorage.getItem('cart')){
      this.prodItems = JSON.parse(localStorage.getItem('cart') || '[]')
      
      console.log(this.prodItems);
    }
  }
}
