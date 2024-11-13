import { ensureElement } from '../../../../utils/utils';
import { getCategoryClass } from '../utils';
import { Card } from '../Card';
import { ICardGallerySettings } from '../../../../types/view/Products/Card';

export class CardGalleryView extends Card {
	protected _category: HTMLElement;
	protected _image: HTMLImageElement;

	constructor(
		protected template: string,
		protected settings: ICardGallerySettings
	) {
		super(template, settings);

		this._category = ensureElement('.card__category', this._element);
		this._image = ensureElement<HTMLImageElement>(
			'.card__image',
			this._element
		);

		this._title.textContent = this.settings.product.title;
		this._category.textContent = this.settings.product.category;
		this._price.textContent = this.settings.product.price
			? `${String(this.settings.product.price)} синапсов`
			: `Бесценно`;

		this._image.src = this.settings.product.image;

		this._category.classList.add(
			getCategoryClass(this.settings.product.category)
		);
		this._element.onclick = () => {
			this.settings.onClick(this.settings.product);
		};
	}
}
