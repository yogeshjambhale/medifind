import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MedifindService } from '../medifind.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'email', 'password','action','qr'];
  // productssData = new MatTableDataSource<productModel>();
  dataSource! : MatTableDataSource<any>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private api:MedifindService,
             public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  
  getAllProduct(){
    this.api.getUsers().subscribe(
      {
        next:(res :any)=>{
          this.dataSource = new MatTableDataSource(res);
        }
      }
    )
  }
  
    deleteProd(id:number){
      this.api.deleteUsers(id).subscribe(
       )
        this.getAllProduct();
      
    } 
      
    
}
