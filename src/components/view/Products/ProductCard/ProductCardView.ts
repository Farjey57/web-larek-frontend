import { cloneTemplate, ensureElement } from '../../../../utils/utils';
import { getCategoryClass } from '../utils';
import {
	IProductCardView,
	ProductCardSettings,
} from '../../../../types/view/Products/ProductCard/ProductCard';

export class ProductCardView implements IProductCardView {
	private element: HTMLElement;
	private category: HTMLElement;
	private title: HTMLElement;
	private image: HTMLImageElement;
	private price: HTMLElement;

	constructor(private settings: ProductCardSettings) {
		this.element = cloneTemplate('#card-catalog');
		this.category = ensureElement('.card__category', this.element);
		this.title = ensureElement('.card__title', this.element);
		this.image = ensureElement<HTMLImageElement>('.card__image', this.element);
		this.price = ensureElement('.card__price', this.element);
	}

	render(): HTMLElement {
		this.title.textContent = this.settings.product.title;
		this.category.textContent = this.settings.product.category;
		this.price.textContent = this.settings.product.price
			? `${String(this.settings.product.price)} синапсов`
			: `Бесценно`;

		this.image.src = this.settings.product.image;

		this.category.classList.add(
			getCategoryClass(this.settings.product.category)
		);
		this.element.onclick = () => {
			this.settings.onClick(this.settings.product);
		};

		return this.element;
	}
}
