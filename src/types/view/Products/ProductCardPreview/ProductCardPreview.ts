import { IProduct } from '../../..';
import { ProductCardPreviewView } from '../../../../components/view/Products/ProductCardPreview/ProductCardPreviewView';

export interface IProductCardPreviewView {
  state: boolean;
  render(): HTMLElement;
}

export type ProductCardPreviewSettings = {
	product: IProduct;
	state: boolean;
	onClick(preview: ProductCardPreviewView): void;
};
