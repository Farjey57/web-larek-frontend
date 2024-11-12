import { IProduct } from '../..';

export interface ICartView {
	render(): HTMLElement
}

export type CartSettings = {
	products: IProduct[];
	totalPrice: number;
	onSubmit(): void;
	onDelete(id: string): void;
};
