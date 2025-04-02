import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductApiResponse } from '../../Interfaces/productApi';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://plantsapi.vercel.app';

  getItems(): Observable<ProductApiResponse> {
    return this.http.get<ProductApiResponse>(this.baseUrl);
  }
}
