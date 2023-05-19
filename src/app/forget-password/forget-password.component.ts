import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MedifindService } from '../medifind.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  formValue:FormGroup|any;
  hide = true
  data:any
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  quetion = new FormControl('', [Validators.required, Validators.minLength(6)]);

  getErrorMessage(){
    if (this.quetion.hasError('minLength(6)')) {
      return 'You must enter a value';
    }

    return this.quetion.hasError('required') ? 'Quetion Must Have 6 Caracters' : '';
  }
  getMailErrorMessage() {
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
  constructor(private api:MedifindService,
              private dialogRef :MatDialogRef<ForgetPasswordComponent>) { }

  ngOnInit(): void {
    this.formValue = new FormGroup({
      "email": new FormControl(),
      "password": new FormControl(),
      "quetion": new FormControl(),
     })
  }

  signupData(){
    // debugger
    this.api.getLoginData().subscribe((res)=>{
      const user =res.find((a:any)=>{
        return a.quetion === this.formValue.value.quetion && a.email ===this.formValue.value.email
      });
      this.data = {
        name: user.name,
        email : user.email,
        quetion : user.quetion,
        password:this.formValue.value.password
      }
      console.log(this.data)
      if(user){
        this.api.putPassword(this.data,user.id).subscribe((res)=>{
          console.log(res,'sas');
          alert('password change successfuly')
          this.formValue.reset();
          this.dialogRef.close();
        })

      }else {
        alert('incorect')
      }
    },err=>{
      alert("Something went wrong!!")
    })
    
  }
}
