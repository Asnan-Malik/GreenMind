import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from '../../Interfaces/productApi';
import { CartService } from '../../Services/Cart/cart.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  checkoutForm: FormGroup;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  get subtotal(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + parseFloat(item?.selling_price?.toString() || '0') * item.quantity,
      0
    );
  }

  get shipping(): number {
    return this.subtotal >= 30 ? 0 : 5;
  }

  get total(): number {
    return this.subtotal + this.shipping;
  }

  removeItem(id: number): void {
    this.cartService.removeItem(id);
  }

  updateQuantity(id: number, quantity: number): void {
    this.cartService.updateQuantity(id, quantity);
  }

  placeOrder(): void {
    if (this.checkoutForm.invalid) {
      // Mark all fields as touched to show validation messages
      this.checkoutForm.markAllAsTouched();
      return;
    }

    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // In a real app, you would send the order to your backend here
    console.log('Order placed:', {
      customer: this.checkoutForm.value,
      items: this.cartItems,
      total: this.total
    });

    // Clear the cart and navigate to confirmation
    this.cartService.clearCart();
    this.router.navigate(['/order-confirmation']);
  }

  goBack(): void {
    this.location.back();
  }
}
