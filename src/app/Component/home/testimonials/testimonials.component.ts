import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgFor],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  testimonials = [
    { feedback: 'Great products and quick delivery!', name: 'Jane Doe' },
    { feedback: 'Love the eco-friendly options.', name: 'John Smith' },
  ];  
}
