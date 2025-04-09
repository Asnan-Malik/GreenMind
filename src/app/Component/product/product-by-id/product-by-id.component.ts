import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../Services/product/product.service';
import { CartItem, Plant } from '../../../Interfaces/productApi';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../Services/Cart/cart.service';
import { CartDrawerComponent } from "../../../Shared/cart-drawer/cart-drawer.component";

@Component({
  selector: 'app-product-by-id',
  standalone: true,
  imports: [CommonModule, CartDrawerComponent],
  templateUrl: './product-by-id.component.html',
  styleUrl: './product-by-id.component.scss'
})
export class ProductByIdComponent {
  product: Plant[] = [];
  productId!: number;
  visible: boolean = false;
  cartItems: CartItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      console.log('Product ID:', this.productId);

      if (this.productId) {
        this.getItems(this.productId);
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  getItems(id: number) {
    this.productService.getItems().subscribe({
      next: (res) => {
        this.product = res.data.filter(res => Number(res.id) === id);
        console.log('Filtered Product:', this.product);
      },
      error: (err) => {
        console.error('Failed to fetch Product API', err);
      }
    });
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
