import { IProduct } from "../..";

export interface IProductsPresenter {
  refreshProducts(): void;
  createGallery(products: IProduct[]): void;
  openProduct(product: IProduct): void;
}
  