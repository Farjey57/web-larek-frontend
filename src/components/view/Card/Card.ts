import { ICard, ICardSettings } from '../../../types/view/Products/Card';
import { cloneTemplate, ensureElement } from '../../../utils/utils';

export abstract class Card implements ICard {
	protected _element: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;

	constructor(protected template: string, protected settings: ICardSettings) {
		this._element = cloneTemplate(template);
		this._title = ensureElement('.card__title', this._element);
		this._price = ensureElement('.card__price', this._element);
	}

	render(): HTMLElement {
		return this._element;
	}
}
