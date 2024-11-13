import { IProduct } from '../..';

export interface ICartView {
	totalPrice: number
	listContainer: HTMLElement[]
	render(): HTMLElement
}

export type CartSettings = {
	products: IProduct[];
	totalPrice: number;
	onSubmit(): void;
};
