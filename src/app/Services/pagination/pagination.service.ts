import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private currentPage = 1;
  private pageSize = 6; // Default items per page

  /** Set the number of items per page */
  setPageSize(size: number) {
    this.pageSize = size;
  }

  /** Get current page number */
  getCurrentPage(): number {
    return this.currentPage;
  }

  /** Get page size */
  getPageSize(): number {
    return this.pageSize;
  }

  /** Calculate total pages */
  getTotalPages(totalItems: number): number {
    return Math.ceil(totalItems / this.pageSize);
  }

  /** Set current page */
  setCurrentPage(page: number, totalItems: number) {
    const totalPages = this.getTotalPages(totalItems);
    this.currentPage = Math.max(1, Math.min(page, totalPages)); // Ensure page is within range
  }

  /** Get paginated data */
  paginateData<T>(data: T[]): T[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return data.slice(startIndex, startIndex + this.pageSize);
  }
}
