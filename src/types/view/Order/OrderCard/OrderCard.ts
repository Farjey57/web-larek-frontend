import { IProduct } from '../../..';

export interface IOrderCardView {
	cartItem: HTMLElement;
	product: IProduct;
	index: number;
	render(container: HTMLElement): void;
}

export type OrderCardViewSettings = {
	product: IProduct;
	index: number;
	onDelete: (id: string) => void;
};
