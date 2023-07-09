import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-order-success-message',
  templateUrl: './order-success-message.component.html',
  styleUrls: ['./order-success-message.component.css'],
  animations: [
    trigger('messageAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in')
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class OrderSuccessMessageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  animationState: 'in' | 'out' = 'in';

  // Call this method when you want to show the message
  showSuccessMessage() {
    this.animationState = 'in';
  }

  // Call this method when you want to hide the message
  hideSuccessMessage() {
    this.animationState = 'out';
  }
}
