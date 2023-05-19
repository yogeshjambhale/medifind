import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedifindService } from '../medifind.service';
import { productModel } from './product-model';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  formValue !: FormGroup;
  actionBtn : string = 'Add Product';
  productObj : productModel = new productModel();
  constructor( private api:MedifindService,
               private formbuilder:FormBuilder,
               @Inject(MAT_DIALOG_DATA) public editData :any,
               private dialogRef :MatDialogRef<AddProductComponent>) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      product_name : ['',Validators.required],
      drug_name : ['',Validators.required],
      manufacturer : ['',Validators.required],
      company : ['',Validators.required],
      mrp :['',Validators.required],
      discount :['',Validators.required],
      image :['',Validators.required],
      qty :['',Validators.required],
      soldQuantity:['']

    });
    if (this.editData){
      this.actionBtn = 'Update';
      this.formValue.controls['product_name'].setValue(this.editData.product_name);
      this.formValue.controls['drug_name'].setValue(this.editData.drug_name);
      this.formValue.controls['company'].setValue(this.editData.company);
      this.formValue.controls['manufacturer'].setValue(this.editData.manufacturer);
      this.formValue.controls['mrp'].setValue(this.editData.mrp);
      this.formValue.controls['discount'].setValue(this.editData.discount);
      this.formValue.controls['image'].setValue(this.editData.file);
      this.formValue.controls['qty'].setValue(this.editData.qty);

    }
    console.log(this.editData);
  }

  postProduct(){
    if(!this.editData){
      if(this.formValue.valid){
        this.productObj.product_name = this.formValue.value.product_name;
        this.productObj.drug_name = this.formValue.value.drug_name;
        this.productObj.company = this.formValue.value.company;
        this.productObj.manufacturer = this.formValue.value.manufacturer;
        this.productObj.mrp = this.formValue.value.mrp;
        this.productObj.discount = this.formValue.value.discount;
        this.productObj.image = this.formValue.value.image;
        this.productObj.qty = this.formValue.value.qty;
    
    
        this.api.postProduct(this.productObj).subscribe(res=>{
          console.log(res);
          alert('product added successfuly')
          this.formValue.reset();
          this.dialogRef.close();
          
        },
        err=>{
          alert('went wrong')
        })
        }
    }
    else{
      this.updateProduct();
    }
  }
  updateProduct(){
    this.api.putProduct(this.formValue.value,this.editData.id)
    .subscribe(res=>{
      console.log(res);
      alert('product update successfuly')
          this.formValue.reset();
          this.dialogRef.close();
    },
    err=>{
      alert('went wrong')
    })
  }

}
