import { IProduct } from '../../..';

export interface IProductCardCartView {
	cartItem: HTMLElement;
	product: IProduct;
	index: number;
	render(container: HTMLElement): void;
}

export type ProductCardCartSettings = {
	product: IProduct;
	index: number;
	onDelete: (id: string) => void;
};
