import type { Product } from "./ProductoInterface";

export interface ProductsResponse {
  count: number;
  pages: number;
  products: Product[];
}
