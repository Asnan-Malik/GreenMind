import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  categories = [
    { name: 'Home Essentials', image: 'assets/categories/home.jpg' },
    { name: 'Personal Care', image: 'assets/categories/personal.jpg' },
    { name: 'Office Supplies', image: 'assets/categories/office.jpg' },
  ];

  constructor(
    private router: Router
  ) {}

  navigateToProduct(){
    this.router.navigate(['/products'])
  }
}

