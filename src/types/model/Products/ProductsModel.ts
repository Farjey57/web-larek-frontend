import { IProduct } from "../..";

export interface IProductsModel {
  refresh(cb?: (data: IProduct[]) => void): Promise<IProduct[]>;
  getProducts(): IProduct[];
  getProductById(id: string): IProduct | undefined;
  setProducts(products: IProduct[]): void;
}