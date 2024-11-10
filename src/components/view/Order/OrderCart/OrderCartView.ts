import { IProduct } from '../../../../types';
import { OrderCartSettings } from '../../../../types/view/Order/OrderCart/OrderCart';
import { cloneTemplate, ensureElement } from '../../../../utils/utils';
import { OrderCardView } from '../OrderCard/OrderCartView';

export class OrderCartView implements OrderCartView {
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
			new OrderCardView({
				product: product,
				index: ++i,
				onDelete: this.settings.onDelete,
			}).render(listContainer);
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
