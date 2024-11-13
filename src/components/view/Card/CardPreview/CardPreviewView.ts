import { ensureElement } from '../../../../utils/utils';
import { getCategoryClass } from '../utils';
import {
	ICardPreview,
	ICardPreviewSettings,
} from '../../../../types/view/Products/Card';
import { Card } from '../Card';

export class CardPreviewView extends Card implements ICardPreview {
	private _state: boolean;
	private _category: HTMLElement;
	private _image: HTMLImageElement;
	private _buttonCart: HTMLButtonElement;

	constructor(
		protected template: string,
		protected settings: ICardPreviewSettings
	) {
		super(template, settings);
		this._category = ensureElement('.card__category', this._element);
		this._image = ensureElement<HTMLImageElement>(
			'.card__image',
			this._element
		);
		this._buttonCart = ensureElement<HTMLButtonElement>(
			'.card__button',
			this._element
		);

		this.state = this.settings.state;
		this._title.textContent = this.settings.product.title;
		this._category.textContent = this.settings.product.category;
		this._price.textContent = this.settings.product.price
			? `${String(this.settings.product.price)} синапсов`
			: `Бесценно`;

		this._image.src = this.settings.product.image;
		this._category.classList.add(
			getCategoryClass(this.settings.product.category)
		);
		this.setButtonDisabled(this.settings.product.price);
	}

	set state(newState: boolean) {
		this._state = newState;
		this.updateButtonText();
	}

	private updateButtonText() {
		this._buttonCart.textContent = this._state
			? 'Удалить из корзины'
			: 'Купить';
	}

	private setButtonDisabled(price: number) {
		if (price) {
			this._buttonCart.onclick = () => this.settings.onClick(this);
		} else {
			this._buttonCart.onclick = null;
			this._buttonCart.setAttribute('disabled', 'disabled');
			this._buttonCart.innerText = 'Эх, пока не продается =(';
		}
	}
}
