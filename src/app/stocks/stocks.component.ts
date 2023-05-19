import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MedifindService } from '../medifind.service';
import 'rxjs/operator/filter';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  displayedColumns: string[] = [ 'product_name', 'drug_name', 'company','avlQty','soldQty','action','qr','img'];
  // productssData = new MatTableDataSource<productModel>();
  dataSource! : MatTableDataSource<any>;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // productsData : productModel[] = [];
  // productData : Observable<productModel[]>;


  constructor( private api:MedifindService,public dialog: MatDialog ) { }

  ngOnInit(): void {
   this.getAllProduct();
  
  }
  // openDialog() {
  //   this.dialog.open(UpdateProductComponent);
  // }
  // openDialogs() {
  //   this.dialog.open(AddProductComponent);
  // }
  addProduct(){
    this.dialog.open(AddProductComponent).afterClosed()
    .subscribe(val=>{
      if(val==='Add Product'){
        this.getAllProduct();
      }
    })
  }

  getAllProduct(){
    this.api.getProduct().subscribe(
      {
        next:(res :any)=>{
          this.dataSource = new MatTableDataSource(res);
        }
      }
    )
  }
  editProduct(element:any){
    this.dialog.open(AddProductComponent,{
      data:element
    }).afterClosed()
    .subscribe(val=>{
      if(val==='Update'){
        this.getAllProduct();
      }
    })
    
  }
    deleteProd(id:number){
      this.api.deleteProduct(id).subscribe(
       )
        this.getAllProduct();
      
    } 
      
    }
  


function id(id: any) {
  throw new Error('Function not implemented.');
}

