export interface Plant {
  id: string;
  name: string;
  type: string;
  price: string;
  selling_price: string;
  img: string;
  sold_out: string;
  description: string;
}

export interface ProductApiResponse {
  data: Plant[];
}


export interface CartItem {
  id: string;
  name: string;
  img: any;
  selling_price: any;
  quantity: number;
  imageUrl?: string;
}
