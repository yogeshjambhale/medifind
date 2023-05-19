import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MedifindService } from '../medifind.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  public otp = false
  public login = true
  hide = true

  password = new FormControl('', [Validators.required, Validators.minLength(6)]);


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('minLength') ? 'Password Must Have 6 Caracters' : '';
  }


  formgroup: FormGroup | any
  constructor(public dialog: MatDialog,
    private api: MedifindService,
    private formbuilder: FormBuilder,
    private dialogRef: MatDialogRef<AdminLoginComponent >,
    private router: Router) { }

  ngOnInit(): void {

    this.formgroup = this.formbuilder.group({
      "password": [''],
      "email": ['']
    })
    console.log(this.formgroup.value)
  }

  
  loginData(){
    
    this.api.getAdminLoginData().subscribe(res=>{
      const user = res.find((a:any)=>{
        if(a.email == this.formgroup.value.email && a.password == this.formgroup.value.password){
         alert('login success') 
         if(res){
          localStorage.setItem('admin',JSON.stringify(res[0]))
        }
         this.dialogRef.close();
         this.router.navigate(['/sidenav']);
        //  this.router.navigate(['/']);
        
        }else{
          alert('login fail')
        }
        console.log(a.email);
        console.log(this.formgroup.value.email)
      })

      
    },err=>{
      alert('error')
    }
    )
  }
  generateOtp(){
    if(this.login==true){
      this.login=false;
      this.otp=true;
    }
  }

}
