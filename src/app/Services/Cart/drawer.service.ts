// src/app/services/drawer.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  openDrawer() {
    this.isOpen.next(true);
  }

  closeDrawer() {
    this.isOpen.next(false);
  }

  toggleDrawer() {
    this.isOpen.next(!this.isOpen.value);
  }
}
