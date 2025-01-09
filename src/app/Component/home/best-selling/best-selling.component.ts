import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-best-selling',
  standalone: true,
  imports:[NgFor],
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.scss'],
})
export class BestSellingComponent {
  products = [
    { name: 'Eco-Friendly Mug', price: 15.99, image: 'assets/products/mug.jpg' },
    { name: 'Reusable Bag', price: 8.99, image: 'assets/products/bag.jpg' },
    { name: 'Bamboo Toothbrush', price: 3.49, image: 'assets/products/toothbrush.jpg' },
  ];
}
