import { Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { ProductComponent } from './Component/product/product.component';
import { AboutUsComponent } from './Component/home/about-us/about-us.component';
import { ContactComponent } from './Component/contact/contact.component';
import { ProductByIdComponent } from './Component/product/product-by-id/product-by-id.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full', // Redirect to Home Page for empty path
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductComponent, // Products Page
  },
  {
    path: 'product/:id',
    component: ProductByIdComponent
  },
  {
    path: 'about',
    component: AboutUsComponent, // About Us Page
  },
  {
    path: 'contact',
    component: ContactComponent, // Contact Us Page
  },
  {
    path: '**',
    redirectTo: '', // Wildcard route to redirect invalid URLs to Home Page
  },
];
