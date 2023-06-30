import { Component, OnInit } from '@angular/core';
import { MedifindService } from '../medifind.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  user:any
  orders:any
  data:any
  constructor( private api : MedifindService) { }

  ngOnInit(): void {

   
    let userinfo = localStorage.getItem('user');
    this.user = userinfo && JSON.parse(userinfo);
    console.log(this.user);

    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    console.log(userId);
    this.api.getOrders().subscribe((res)=>{
      this.orders = res;
      console.log(res,'aa');
      this.data = this.orders.filter((item: { userId: any; }) => item.userId == userId);
      console.log(this.data)
    })
  }
  


}
