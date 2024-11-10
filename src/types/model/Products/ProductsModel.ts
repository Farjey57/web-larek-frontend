import { IProduct } from "../..";

export interface IProductsModel {
  getProducts(): IProduct[];
  getProductById(id: string): IProduct | undefined;
  setProducts(products: IProduct[]): void;
}