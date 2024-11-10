import { IProduct } from '../../..';

export interface OrderCartView {
	template: HTMLElement;
}

export type OrderCartSettings = {
	products: IProduct[];
	totalPrice: string;
	onSubmit(): void;
	onDelete(id: string): void;
};
