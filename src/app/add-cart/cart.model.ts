import { productModel } from "../add-product/product-model";

export class Cart {
    id : number = 0;
    product_name : string = '';
    drug_name : string = '';
    company : string = '';
    qty : number = 0;
    

    constructor(id :number,product:productModel,qty:1){
        this.id = id;
        this.product_name = product.product_name;
        this.drug_name = product.drug_name;
        this.company = product.company;
        this.qty = product.qty;
        

    }
}


