import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedifindService } from '../medifind.service';


@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {

  formValue:FormGroup|any;
  hide = true

  name = new FormControl('', [Validators.required, Validators.minLength(6)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  quetion = new FormControl('', [Validators.required, Validators.minLength(6)]);

  getErrorMessage(){
    if (this.name.hasError('minLength(6)')) {
      return 'You must enter a value';
    }

    return this.name.hasError('required') ? 'Name Must Have 6 Caracters' : '';
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
    private router:Router) { }

  ngOnInit(): void {
    this.formValue = new FormGroup({
      "name": new FormControl(),
      "email": new FormControl(),
      "password": new FormControl(),
      "quetion": new FormControl(),
      
     })
  }

  signupData(){
    debugger
    this.api.getLoginData().subscribe((res)=>{
      const email =res.find((a:any)=>{
        return a.email ===this.formValue.value.email
      });
      if(email){
        alert("Email already exist");
      }else if(this.formValue.valid){
        this.api.signUpData(this.formValue.value).subscribe(res=>{
          console.log(res)
          if(res){
            localStorage.setItem('user',JSON.stringify(res))
          }
          this.formValue.reset();
    
        })
      }
    })
    
  }

}
