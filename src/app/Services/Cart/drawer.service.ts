import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private isOpenSource = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSource.asObservable();

  openDrawer() {
    this.isOpenSource.next(true);
  }

  closeDrawer() {
    this.isOpenSource.next(false);
  }

  toggleDrawer() {
    this.isOpenSource.next(!this.isOpenSource.value);
  }
}
