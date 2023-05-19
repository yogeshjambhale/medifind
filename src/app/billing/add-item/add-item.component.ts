import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public editData :any,
              private dialogRef :MatDialogRef<AddItemComponent>) { }

  ngOnInit(): void {
    console.log(this.editData)
  }

}
