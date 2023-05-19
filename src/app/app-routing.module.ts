import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBillsComponent } from './add-bills/add-bills.component';
import { AddCartComponent } from './add-cart/add-cart.component';
// import { AddProductComponent } from './add-product/add-product.component';
import { ExpiryAlertComponent } from './expiry-alert/expiry-alert.component';
// import { LogInComponent } from './log-in/log-in.component';
import { LogOutComponent } from './log-out/log-out.component';
import { PaymentComponent } from './payment/payment.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SalesComponent } from './sales/sales.component';
import { StocksComponent } from './stocks/stocks.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BillingComponent } from './billing/billing.component';
import { HomeComponent } from './home/home.component';
import { ProdDetailsComponent } from './prod-details/prod-details.component';
import { CheckoutComponent } from './add-cart/checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { UserProfilComponent } from './user-profil/user-profil.component';


const routes: Routes = [
  
  // { path: "''", redirectTo:'stocks', pathMatch: 'full'}
  { path: 'sidenav', component:SidenavComponent,
    children:[
      
      
      
    ]  

  },
  { path: 'add-bills', component: AddBillsComponent,},
      { path: 'billing', component:BillingComponent },
      // { path: 'add-product', component: AddProductComponent },
      { path: 'expiry-alert', component: ExpiryAlertComponent },
      // { path: 'log-in', component: LogInComponent},
      { path: 'log-out', component: LogOutComponent },
      { path: 'payment', component: PaymentComponent},
      { path: 'purchase', component: PurchaseComponent },
      { path: 'sales', component: SalesComponent},
      { path: 'stocks', component: StocksComponent },
  {path:'', component:HomeComponent},
  { path: 'prod-details/:id', component: ProdDetailsComponent },
  { path: 'add-cart/:id', component: AddCartComponent },
  {path:'checkout', component:CheckoutComponent},
  {path:'orders', component:OrdersComponent},
  {path:'users', component:UsersComponent},
  {path:'user-profil', component:UserProfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
