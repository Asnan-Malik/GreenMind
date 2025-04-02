import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {
  testimonials = [
    {
      content: 'Great products and quick delivery!',
      name: 'Jane Doe',
      platform: 'Youtuber',
      rating: 4.5,
      image: 'img/user1.svg'
    },
    {
      content: 'Love the eco-friendly options.',
      name: 'John Smith',
      platform: 'Eco Blogger',
      rating: 4.8,
      image: 'img/user2.svg'
    },
    {
      content: 'Amazing customer service!',
      name: 'Alice Johnson',
      platform: 'Designer',
      rating: 4.9,
      image: 'img/user3.svg'
    },
    {
      content: 'Fast shipping, highly recommended.',
      name: 'Bob Brown',
      platform: 'Entrepreneur',
      rating: 4.7,
      image: 'img/user4.svg'
    }
  ];

  activeIndex: number = 0;
  autoSlideInterval: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval);
  }

  // Function to change slide automatically
  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  // Navigate to the next slide
  nextSlide(): void {
    this.activeIndex = (this.activeIndex + 1) % this.testimonials.length;
  }

  // Navigate to the previous slide
  previousSlide(): void {
    this.activeIndex = (this.activeIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  // Navigate to a specific slide using manual indicators
  goToSlide(index: number): void {
    if (index < 0) {
      this.activeIndex = this.testimonials.length - 1;
    } else if (index >= this.testimonials.length) {
      this.activeIndex = 0;
    } else {
      this.activeIndex = index;
    }
  }
}
