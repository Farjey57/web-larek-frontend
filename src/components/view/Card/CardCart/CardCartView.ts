import { ICardCartSettings } from '../../../../types/view/Products/Card';
import { ensureElement } from '../../../../utils/utils';
import { Card } from '../Card';

export class CardCartView extends Card {
	protected _index: HTMLElement;
	protected _buttonDelete: HTMLButtonElement;

	constructor(
		protected template: string,
		protected settings: ICardCartSettings
	) {
		super(template, settings);

		this._index = ensureElement('.basket__item-index', this._element);
		this._buttonDelete = ensureElement<HTMLButtonElement>(
			'.basket__item-delete',
			this._element
		);
		this._index.innerText = String(this.settings.index);
		this._title.innerText = this.settings.product.title;
		this._price.innerText = `${Number(this.settings.product.price)} синапсов`;
		this._buttonDelete.onclick = () =>
			this.settings.onDelete(this.settings.product.id);
	}
}
