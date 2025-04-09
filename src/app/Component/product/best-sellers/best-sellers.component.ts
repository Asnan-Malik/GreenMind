import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Services/product/product.service';
import { CartItem, Plant, ProductApiResponse } from '../../../Interfaces/productApi';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../Services/Cart/cart.service';
import { CartDrawerComponent } from "../../../Shared/cart-drawer/cart-drawer.component";

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, CartDrawerComponent],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.scss'
})
export class BestSellersComponent implements OnInit {
  products: Plant[] = [];
  visible: boolean = false;
  cartItems: CartItem[] = [];

  constructor(private productService: ProductService, private router: Router, private cartService: CartService) {}

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

  addToCart(product: Plant) {
    this.cartService.addItem({
      id: product.id,
      name: product.name,
      selling_price: product.selling_price,
      img: product.img,
      quantity: 1
    });
    // No need to manually set visible - the service handles it
  }
}
