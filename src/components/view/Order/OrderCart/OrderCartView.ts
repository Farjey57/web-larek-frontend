import { IProduct } from '../../../../types';
import { cloneTemplate, ensureElement } from '../../../../utils/utils';

export class OrderCartView {
	constructor(private settings: OrderCartSettings) {}

	get template(): HTMLElement {
		const { products, onSubmit } = this.settings;
		const cart = cloneTemplate('#basket');
		const listContainer = ensureElement('.basket__list', cart);
		const basketButton = ensureElement<HTMLButtonElement>(
			'.basket__button',
			cart
		);

		ensureElement(
			'.basket__price',
			cart
		).innerText = `${this.settings.totalPrice} синапсов`;

		basketButton.onclick = onSubmit;
		basketButton.disabled = !+this.settings.totalPrice;

		products.forEach((product, i) => {
			listContainer.appendChild(this.createItem(product, i));
		});
		return cart;
	}

	private createItem(product: IProduct, index: number): HTMLElement {
		const cartItem = cloneTemplate('#card-basket');
		ensureElement('.basket__item-index', cartItem).innerText = String(++index);
		ensureElement('.card__title', cartItem).innerText = product.title;
		ensureElement('.card__price', cartItem).innerText = `${Number(
			product.price
		)} синапсов`;
		ensureElement('.basket__item-delete', cartItem).onclick = () =>
			this.settings.onDelete(product.id);

		return cartItem;
	}
}

export type OrderCartSettings = {
	products: IProduct[];
	totalPrice: string;
	onSubmit(): void;
	onDelete: (id: string) => void;
};
