import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MedifindService } from '../medifind.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  public product :any ;
  public orders:any;
  public order:any;
  // userID:any | undefined;
  displayedColumns: string[] = ['id','product_name','drug_name','company','mrp','quantity','userId','action'];
  dataSource !: MatTableDataSource<any>;
  // changeDetectorRef: ChangeDetectorRef;

  // @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(
              private api : MedifindService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  getAllProduct(){

  //  debugger
    this.api.getOrders().subscribe((res)=>{
        // console.log(userID,'bhsbxhjsvjxsvxhvsXHVHJXVJV')
        console.log(res,'ggjjvjh')
        this.product = res
        // for(let i=0; i<this.product.length; i++){
        //   this.orders=this.product[i];
        //   console.log(this.orders,'dsd');
        //   for(let j=0; j<this.product[i].length; j++){
        //     this.order=this.product[i][j];
        //     console.log(this.order),'dsds';
            
        //   }
          
        // }
        this.dataSource = new MatTableDataSource(this.product);
        console.log(this.order)
        
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        // this.changeDetectorRef.detectChanges();
      },error=>{
        alert("Error while fetching the records")
      })


  }

  deleteOrder(id:number){
    this.api.deleteOrders(id)
    .subscribe({
      next:(res)=>{
        alert("order deleted sucessfully")
        this.getAllProduct();
      },
      error:()=>{
        alert("error while deleting product!")
      }
    })
    this.getAllProduct()
  }
}

