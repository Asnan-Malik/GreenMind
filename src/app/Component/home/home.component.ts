import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { BestSellingComponent } from './best-selling/best-selling.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CategoriesComponent } from './categories/categories.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    BestSellingComponent,
    AboutUsComponent,
    CategoriesComponent,
    TestimonialsComponent,
    NewsletterComponent  
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
