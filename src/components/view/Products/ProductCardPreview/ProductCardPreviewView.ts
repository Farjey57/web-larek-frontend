import {
	cloneTemplate,
	ensureElement,
	getImageUrl,
} from '../../../../utils/utils';
import { CDN_URL } from '../../../../utils/constants';
import { getCategoryClass } from '../utils';
import {
	IProductCardPreviewView,
	ProductCardPreviewSettings,
} from '../../../../types/view/Products/ProductCardPreview/ProductCardPreview';

export class ProductCardPreviewView implements IProductCardPreviewView {
	constructor(private readonly settings: ProductCardPreviewSettings) {}

	get template() {
		const { product, buttonText, onClick } = this.settings;
		const card = cloneTemplate('#card-preview');
		const cardCategory = ensureElement('.card__category', card);
		const classname = getCategoryClass(product.category);
		const buttonCart = ensureElement('.card__button', card);

		cardCategory.innerText = product.category;
		cardCategory.classList.add(classname);

		if (product.price) {
			buttonCart.innerText = buttonText;
			buttonCart.onclick = () => onClick(product);
		} else {
			buttonCart.setAttribute('disabled', 'disabled');
			buttonCart.innerText = 'Эх, пока не продается =(';
		}

		ensureElement('.card__title', card).innerText = product.title;
		ensureElement<HTMLImageElement>('.card__image', card).src = getImageUrl(
			CDN_URL,
			product.image
		);
		ensureElement('.card__price', card).innerText = product.price
			? `${String(product.price)} синапсов`
			: `Бесценно`;

		return card;
	}
}
