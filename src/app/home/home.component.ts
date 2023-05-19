import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  img = ('assets/images/img.jpg')
  img1 = ('assets/images/img1.jpg')
  img2 = ('assets/images/img2.jpg')
  constructor() { }

  ngOnInit(): void {
  }

}
