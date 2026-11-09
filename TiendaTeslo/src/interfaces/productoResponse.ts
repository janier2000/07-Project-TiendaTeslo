import type { Product } from "./productoInterface";

export interface ProductsResponse {
  count: number;
  pages: number;
  products: Product[];
}
