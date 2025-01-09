import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  categories = [
    { name: 'Home Essentials', image: 'assets/categories/home.jpg' },
    { name: 'Personal Care', image: 'assets/categories/personal.jpg' },
    { name: 'Office Supplies', image: 'assets/categories/office.jpg' },
  ];
  
}
