import {
	cloneTemplate,
	ensureElement,
	getImageUrl,
} from '../../../../utils/utils';
import { IProduct } from '../../../../types';
import { CDN_URL } from '../../../../utils/constants';
import { getCategoryClass } from '../utils';

export class ProductCardView {
	constructor(private settings: ProductCardViewType) {}

	render(container: HTMLElement) {
		const card = cloneTemplate('#card-catalog');
		const classname = getCategoryClass(this.settings.category);

		ensureElement('.card__title', card).innerText = this.settings.title;
		ensureElement<HTMLImageElement>('.card__image', card).src = getImageUrl(
			CDN_URL,
			this.settings.image
		);
		ensureElement('.card__category', card).innerText = this.settings.category;
		ensureElement('.card__category', card).classList.add(classname);
		ensureElement('.card__price', card).innerText = this.settings.price
			? `${String(this.settings.price)} синапсов`
			: `Бесценно`;
		card.onclick = () => {
			this.settings.onClick(this.settings);
		};
		container.appendChild(card);
	}
}

export type ProductCardViewType = {
	size: 'medium' | 'large' | 'small';
	title: string;
	description: string;
	price: number;
	image: string;
	category: string;
	id: string;

	onClick: (data: IProduct) => void;
};
