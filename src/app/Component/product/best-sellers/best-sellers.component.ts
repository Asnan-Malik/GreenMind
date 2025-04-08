import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Services/product/product.service';
import { Plant, ProductApiResponse } from '../../../Interfaces/productApi';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.scss'
})
export class BestSellersComponent implements OnInit {
  products: Plant[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getItems().subscribe({
      next: (response: ProductApiResponse) => {
        this.products = response.data.slice(0, 4);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  getProductDescription(id: any){
    const productId = Number(id)
    this.router.navigate([`product/${productId}`]);
  }
}
