import { IProduct } from '../../..';

export type ProductsGallerySettings = {
	products: IProduct[];
	onProductClick: (id: IProduct) => void;
};

export interface ProductsGalleryView {
  render(container: HTMLElement): void;
}