import { IProduct } from "../../..";

export type ProductCardSettings = {
	title: string;
	description: string;
	price: number;
	image: string;
	category: string;
	id: string;
	onClick: (data: IProduct) => void;
};

export interface IProductCardView {
  render(container: HTMLElement): void;
}