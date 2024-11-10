import {
	cloneTemplate,
	ensureElement,
	getImageUrl,
} from '../../../../utils/utils';
import { CDN_URL } from '../../../../utils/constants';
import { getCategoryClass } from '../utils';
import {
	IProductCardView,
	ProductCardSettings,
} from '../../../../types/view/Products/ProductCard/ProductCard';

export class ProductCardView implements IProductCardView {
	constructor(private settings: ProductCardSettings) {}

	render(container: HTMLElement) {
		const card = cloneTemplate('#card-catalog');
		const cardCategory = ensureElement('.card__category', card);
		const classname = getCategoryClass(this.settings.category);

		ensureElement('.card__title', card).innerText = this.settings.title;
		ensureElement<HTMLImageElement>('.card__image', card).src = getImageUrl(
			CDN_URL,
			this.settings.image
		);
		cardCategory.innerText = this.settings.category;
		cardCategory.classList.add(classname);
		ensureElement('.card__price', card).innerText = this.settings.price
			? `${String(this.settings.price)} синапсов`
			: `Бесценно`;
		card.onclick = () => {
			this.settings.onClick(this.settings);
		};
		container.appendChild(card);
	}
}
