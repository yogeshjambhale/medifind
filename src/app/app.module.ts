import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCartComponent } from './add-cart/add-cart.component';
// import {MaterialModule} from './material.module';
import { StocksComponent } from './stocks/stocks.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddBillsComponent } from './add-bills/add-bills.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SalesComponent } from './sales/sales.component';
import { ExpiryAlertComponent } from './expiry-alert/expiry-alert.component';
import { PaymentComponent } from './payment/payment.component';
import { LogOutComponent } from './log-out/log-out.component';
import { LogInComponent } from './log-in/log-in.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BillingComponent } from './billing/billing.component';
import { AddItemComponent } from './billing/add-item/add-item.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminSignupComponent } from './admin-signup/admin-signup.component';
import { ProdDetailsComponent } from './prod-details/prod-details.component';
import { CheckoutComponent } from './add-cart/checkout/checkout.component';
import { FormComponent } from './add-cart/checkout/form/form.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
// import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';




@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    AddCartComponent,
    StocksComponent,
    AddProductComponent,
    AddBillsComponent,
    PurchaseComponent,
    SalesComponent,
    ExpiryAlertComponent,
    PaymentComponent,
    LogOutComponent,
    LogInComponent,
    SidenavComponent,
    BillingComponent,
    AddItemComponent,
    SignupComponent,
    HomeComponent,
    AdminLoginComponent,
    AdminSignupComponent,
    ProdDetailsComponent,
    CheckoutComponent,
    FormComponent,
    OrdersComponent,
    UsersComponent,
    ForgetPasswordComponent,
    UserProfilComponent,
    // ZXingScannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    // ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LogInComponent,
    // AddCartComponent,
    AddProductComponent,
    SignupComponent,
    AdminLoginComponent,
    FormComponent,
    ForgetPasswordComponent
  ]
})

export class AppModule { }
