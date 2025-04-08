import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { CartDrawerComponent } from "../cart-drawer/cart-drawer.component";
import { DrawerService } from '../../Services/Cart/drawer.service';
import { CartService } from '../../Services/Cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ButtonModule, DrawerModule, CartDrawerComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cartItems: any[] = [];

  constructor(
    public drawerService: DrawerService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  openCart() {
    this.drawerService.openDrawer();
  }
}
