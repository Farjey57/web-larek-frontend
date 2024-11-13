import { ISuccess, successSettings } from '../../../types/view/Success/Success';
import { cloneTemplate, ensureElement } from '../../../utils/utils';

export class Success implements ISuccess {
	protected _element: HTMLElement;
	protected _description: HTMLElement;
	protected _close: HTMLElement;

	constructor(protected template: string, protected settings: successSettings) {
		this._element = cloneTemplate(template);
		this._description = ensureElement(
			'.order-success__description',
			this._element
		);
		this._close = ensureElement('.order-success__close', this._element);
	}

	render() {
		this._close.onclick = this.settings.onClick;
		return this._element;
	}

	set description(text: string) {
		this._description.textContent = text;
	}
}
