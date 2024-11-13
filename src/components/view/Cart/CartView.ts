import { CartSettings, ICartView } from '../../../types/view/Cart/Cart';
import { cloneTemplate, ensureElement } from '../../../utils/utils';

export class CartView implements ICartView {
	private _element: HTMLElement;
	private _listContainer: HTMLElement;
	private _submitButton: HTMLButtonElement;
	private _totalPrice: HTMLElement;

	constructor(protected template: string, protected settings: CartSettings) {
		this._element = cloneTemplate(template);
		this._listContainer = ensureElement('.basket__list', this._element);
		this._submitButton = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this._element
		);
		this._totalPrice = ensureElement('.basket__price', this._element);
		this.totalPrice = this.settings.totalPrice;
	}

	render() {
		this._submitButton.onclick = this.settings.onSubmit;

		return this._element;
	}

	set listContainer(items: HTMLElement[]) {
		this._listContainer.replaceChildren(...items);
	}

	set totalPrice(total: number) {
		this._totalPrice.textContent = `${total} синапсов`;
		this.setButtonDisabled(total);
	}

	private setButtonDisabled(price: number) {
		if (price) {
			this._submitButton.onclick = () => this.settings.onSubmit();
			this._submitButton.removeAttribute('disabled');
		} else {
			this._submitButton.onclick = null;
			this._submitButton.setAttribute('disabled', 'disabled');
		}
	}
}
