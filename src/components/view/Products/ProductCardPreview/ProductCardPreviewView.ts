import { cloneTemplate, ensureElement } from '../../../../utils/utils';
import { getCategoryClass } from '../utils';
import {
	IProductCardPreviewView,
	ProductCardPreviewSettings,
} from '../../../../types/view/Products/ProductCardPreview/ProductCardPreview';

export class ProductCardPreviewView implements IProductCardPreviewView {
	private _state: boolean;
	private element: HTMLElement;
	private category: HTMLElement;
	private title: HTMLElement;
	private image: HTMLImageElement;
	private price: HTMLElement;
	private buttonCart: HTMLButtonElement;

	constructor(private readonly settings: ProductCardPreviewSettings) {
		this.element = cloneTemplate('#card-preview');
		this.category = ensureElement('.card__category', this.element);
		this.title = ensureElement('.card__title', this.element);
		this.image = ensureElement<HTMLImageElement>('.card__image', this.element);
		this.price = ensureElement('.card__price', this.element);
		this.buttonCart = ensureElement<HTMLButtonElement>(
			'.card__button',
			this.element
		);
	}

	render() {
		this.state = this.settings.state;
		this.title.textContent = this.settings.product.title;
		this.category.textContent = this.settings.product.category;
		this.price.textContent = this.settings.product.price
			? `${String(this.settings.product.price)} синапсов`
			: `Бесценно`;

		this.image.src = this.settings.product.image;

		this.category.classList.add(
			getCategoryClass(this.settings.product.category)
		);
		this.setButtonDisabled(this.settings.product.price);

		return this.element;
	}

	set state(newState: boolean) {
		this._state = newState;
		this.updateButtonText();
	}

	private updateButtonText() {
		this.buttonCart.textContent = this._state ? 'Удалить из корзины' : 'Купить';
	}

	private setButtonDisabled(price: number) {
		if (price) {
			this.buttonCart.onclick = () => this.settings.onClick(this);
		} else {
			this.buttonCart.onclick = null;
			this.buttonCart.setAttribute('disabled', 'disabled');
			this.buttonCart.innerText = 'Эх, пока не продается =(';
		}
	}
}
