import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, map, Observable, of } from 'rxjs';
import { ProductService } from '../../../Services/product/product.service';
import { Plant } from '../../../Interfaces/productApi';
import { LoaderComponent } from "../../../Shared/loader/loader/loader.component";


@Component({
  selector: 'app-best-selling',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.scss'],
})
export class BestSellingComponent implements OnInit {
  products: Plant[]| null = null;
  loader = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loader = true;
    this.productService.getItems().subscribe({
      next: (res) => {
        this.products = res.data.slice(0, 3);
        this.loader = false;
      },
      error: (err) => {
        this.loader = false;
        console.error('Error fetching the Plants API');
      }
    })
  }
}
