import { Component } from '@angular/core';
import { ProductService } from '../../Services/product/product.service';
import { Plant } from '../../Interfaces/productApi';
import { AllProductsComponent } from "./all-products/all-products.component";
import { BestSellersComponent } from "./best-sellers/best-sellers.component";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [AllProductsComponent, BestSellersComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  plants: Plant[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getItems().subscribe({
      next: (response) => {
        this.plants = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}
