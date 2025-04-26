import { Component } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  ProductList: IProduct[] = [];
  constructor() {
    this.ProductList.push(
      {
        ID: 1,
        Name: 'phone',
        Quantity: 1,
        Price: 250,
        img: './phone.jpg',
      },
      {
        ID: 2,
        Name: 'Laptop',
        Quantity: 1,
        Price: 550,
        img: './Laptop.jpg',
      },
      {
        ID: 1,
        Name: 'TV',
        Quantity: 1,
        Price: 2500,
        img: './TV.jpg',
      }
    );
  }
}
