import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../Interfaces/productApi';
import { DrawerService } from './drawer.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(private drawerService: DrawerService) {}

  get items(): CartItem[] {
    return this.cartItems.getValue();
  }

  addItem(item: CartItem) {
    const currentItems = this.cartItems.value;
    const existingIndex = currentItems.findIndex(i => i.id === item.id);

    if (existingIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + 1
      };
      this.cartItems.next(updatedItems);
    } else {
      this.cartItems.next([...currentItems, { ...item, quantity: 1 }]);
    }

    // Automatically open the drawer when adding items
    this.drawerService.openDrawer();
  }

  removeItem(id: number) {
    this.cartItems.next(this.items.filter(i => Number(i.id) !== id));
  }

  updateQuantity(id: number, quantity: number) {
    if (quantity < 1) {
      this.removeItem(id);
      return;
    }

    const updatedItems = this.items.map(item =>
      Number(item.id) === id ? { ...item, quantity } : item
    );
    this.cartItems.next(updatedItems);
  }

  clearCart() {
    this.cartItems.next([]);
  }
}
