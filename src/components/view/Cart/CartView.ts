import { CartSettings, ICartView } from '../../../types/view/Cart/Cart';
import { cloneTemplate, ensureElement } from '../../../utils/utils';

export class CartView implements ICartView {
  element: HTMLElement;
  _listContainer: HTMLElement;
	submitButton: HTMLButtonElement;
	_totalPrice: HTMLElement;

	constructor(private settings: CartSettings) {
		this.element = cloneTemplate('#basket');
		this._listContainer = ensureElement('.basket__list', this.element);
		this.submitButton = ensureElement<HTMLButtonElement>('.basket__button', this.element);
		this._totalPrice = ensureElement('.basket__price', this.element);
	}

	render() {
		this._totalPrice.textContent = `${this.settings.totalPrice} синапсов`;

		this.submitButton.onclick = this.settings.onSubmit;
		this.submitButton.disabled = !this.settings.totalPrice;

		// products.forEach((product, i) => {
		// 	new ProductCardCartView({
		// 		product: product,
		// 		index: ++i,
		// 		onDelete: this.settings.onDelete,
		// 	}).render(listContainer);
		// });
		return this.element;
	}

  set listContainer(items: HTMLElement[]) {
		this._listContainer.replaceChildren(...items);
	}

  set totalPrice(total: string) {
    this._totalPrice.textContent = `${this.settings.totalPrice} синапсов`;
  }
}
