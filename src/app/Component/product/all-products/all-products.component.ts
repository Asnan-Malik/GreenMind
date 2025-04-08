import { Component } from '@angular/core';
import { CartItem, Plant } from '../../../Interfaces/productApi';
import { ProductService } from '../../../Services/product/product.service';
import { PaginationService } from '../../../Services/pagination/pagination.service'; // Import PaginationService
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from "../../../Shared/loader/loader/loader.component";
import { Router } from '@angular/router';
import { CartService } from '../../../Services/Cart/cart.service';
import { CartDrawerComponent } from '../../../Shared/cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, FormsModule, LoaderComponent, CartDrawerComponent  ],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent {
  plants: Plant[] = []; // All plants from API
  filteredPlants: Plant[] = []; // Filtered plants for pagination
  plantTypes: string[] = []; // Unique plant types
  filteredTypes: string[] = []; // Filtered types based on search input
  selectedTypes: string[] = []; // Selected types
  searchQuery: string = ''; // Search input for filtering types
  loader = false;
  visible: boolean = false;
  cartItems: CartItem[] = [];

  constructor(
    private productService: ProductService,
    public paginationService: PaginationService, // Inject PaginationService
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loader = true;
    this.productService.getItems().subscribe({
      next: (response) => {
        this.loader = false;
        this.plants = response.data;
        this.filteredPlants = [...this.plants]; // Show all plants initially

        // Extract unique plant types
        this.plantTypes = [...new Set(this.plants.map((plant) => plant.type))];
        this.filteredTypes = [...this.plantTypes]; // Initially, show all types
      },
      error: (err) => {
        this.loader = false;
        console.error('Error fetching the Plants API');
      },
    });
  }

  /** Filter plants based on selected types */
  filterPlants() {
    if (this.selectedTypes.length === 0) {
      this.filteredPlants = [...this.plants]; // Show all if nothing is selected
    } else {
      this.filteredPlants = this.plants.filter((plant) =>
        this.selectedTypes.includes(plant.type)
      );
    }

    // Update the filtered data based on current pagination
    this.paginateFilteredPlants();
  }

  /** Toggle checkbox selection */
  toggleTypeSelection(type: string) {
    if (this.selectedTypes.includes(type)) {
      this.selectedTypes = this.selectedTypes.filter((t) => t !== type);
    } else {
      this.selectedTypes.push(type);
    }
    this.filterPlants();
  }

  /** Filter checkboxes based on search input */
  filterTypeList() {
    this.filteredTypes = this.plantTypes.filter((type) =>
      type.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  /** Handle pagination for filtered plants */
  paginateFilteredPlants() {
    const paginatedPlants = this.paginationService.paginateData(this.filteredPlants);
    this.filteredPlants = [...paginatedPlants]; // Update the displayed plants
  }

  /** Set the current page for pagination */
  setPage(page: number) {
    this.paginationService.setCurrentPage(page, this.filteredPlants.length);
    this.paginateFilteredPlants(); // Reapply pagination after setting the page
  }

  /** Get total pages for pagination */
  get totalPages(): number {
    return this.paginationService.getTotalPages(this.filteredPlants.length);
  }

  getProductDescription(id: any){
    const productId = Number(id)
    this.router.navigate([`product/${productId}`]);
  }

  // Update the addToCart method in AllProductsComponent
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
