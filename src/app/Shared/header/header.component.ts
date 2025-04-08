import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { CartDrawerComponent } from "../cart-drawer/cart-drawer.component";
import { DrawerService } from '../../Services/Cart/drawer.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ButtonModule, DrawerModule, CartDrawerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  addToCartDrawer = false;
  cartItems = [];

  constructor(private drawerService: DrawerService) {}

  toggleCart() {
  this.drawerService.toggleDrawer();
}
}
