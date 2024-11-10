import { IProduct } from '../../../../types';
import {
	cloneTemplate,
	ensureElement,
	getImageUrl,
} from '../../../../utils/utils';
import { CDN_URL } from '../../../../utils/constants';
import { getCategoryClass } from '../utils';

export class ProductCardPreviewView {
	constructor(private readonly settings: ProductCardPreviewSettings) {}

	get template() {
		const { product, buttonText, onClick } = this.settings;
		const card = cloneTemplate('#card-preview');
    const classname = getCategoryClass(product.category);
    const buttonCart = ensureElement('.card__button', card)

		ensureElement('.card__title', card).innerText = product.title;
		ensureElement<HTMLImageElement>('.card__image', card).src = getImageUrl(
			CDN_URL,
			product.image
		);
		ensureElement('.card__category', card).innerText = product.category;
		ensureElement('.card__category', card).classList.add(classname)
		ensureElement('.card__price', card).innerText = product.price
			? `${String(product.price)} синапсов`
			: `Бесценно`;
      
    buttonCart.innerText = buttonText;
    buttonCart.onclick = () => onClick(product);
		return card;
	}
}

export type ProductCardPreviewSettings = {
	product: IProduct;
	buttonText: string;
	onClick(product: IProduct): void;
};
