export class productModel{
     id : number = 0;
     product_name : string = '';
     drug_name : string = '';
     company : string = '';
     manufacturer : string = '';
     mrp : string = '';
     discount : number = 0;
     image : string = '';
     qty : number = 0;
     quantity:undefined | number;
     avlQty:number=0;
     soldQty:number=0
}
export class address{
     name? : string = '';
     address? : string = '';
     state? : string = '';
     city? : string = '';
     pincode? : number;
     mobile? : number;
     userId?:number;
}