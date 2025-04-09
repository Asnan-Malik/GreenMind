import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { CartItem } from '../../Interfaces/productApi';
import { CartService } from '../../Services/Cart/cart.service';
import { DrawerService } from '../../Services/Cart/drawer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, ButtonModule, DrawerModule],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss'
})
export class CartDrawerComponent {
  @Input() visible: boolean = false;
  @Input() cartItems: CartItem[] = [];

  @Output() closeDrawer: EventEmitter<void> = new EventEmitter<void>();

  constructor(private cartService: CartService, private drawerService: DrawerService, private router: Router) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.drawerService.isOpen$.subscribe(isOpen => {
      this.visible = isOpen;
    });
  }

  get subtotal(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + parseFloat(item?.selling_price?.toString() || '0') * item.quantity,
      0
    );
  }

  get total(): number {
    return this.subtotal + this.shipping;
  }

  get shipping(): number {
    return this.subtotal >= 30 ? 5 : 0;
  }

  removeItem(id: any) {
    const productId = Number(id);
    this.cartService.removeItem(productId);
  }

  updateQuantity(id: any, quantity: number) {
    const productId = Number(id);
    this.cartService.updateQuantity(productId, quantity);
  }

  onClose() {
    this.drawerService.closeDrawer();
  }

  proceedToCheckout(): void {
    this.drawerService.closeDrawer();
    this.router.navigate(['/checkout']);
  }
}
