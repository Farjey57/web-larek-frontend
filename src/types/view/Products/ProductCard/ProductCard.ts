import { IProduct } from "../../..";

export type ProductCardSettings = {
	product: IProduct
	onClick: (data: IProduct) => void;
};

export interface IProductCardView {
  render(): HTMLElement;
}