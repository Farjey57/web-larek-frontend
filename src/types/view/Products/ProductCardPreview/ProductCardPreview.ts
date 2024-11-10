import { IProduct } from '../../..';

export interface IProductCardPreviewView {
	template: HTMLElement;
}

export type ProductCardPreviewSettings = {
	product: IProduct;
	buttonText: string;
	onClick(product: IProduct): void;
};
