import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { IProduct } from '../../../Models/Product';
import { IProductDetails } from '../../../Models/ProductDetails';
import { ProductsFromAPIService } from '../../../Services/ProductsFromAPI.service';

@Component({
  selector: 'app-product-Details',
  templateUrl: './product-Details.component.html',
  styleUrls: ['./product-Details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id: number = -1;
  product: IProduct | undefined;
  productDetails: IProductDetails | undefined;
  constructor(
    private routeInfo: ActivatedRoute,
    private productSrv: ProductService,
    private productAPI: ProductsFromAPIService
  ) {
    // this.routeInfo.params.subscribe(data=>console.log(data));

    console.log(this.routeInfo.snapshot.params);
    this.id = this.routeInfo.snapshot.params['id'] as number;

    // this.product=  this.productSrv.findById(this.id)
    this.productAPI.getProductByID(this.id).subscribe({
      next: (res) => {
        this.productDetails = res;
        console.log(this.productDetails);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {}
}
