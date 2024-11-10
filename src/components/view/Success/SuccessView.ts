import { ISuccess, successSettings } from '../../../types/view/Success/Success';
import { cloneTemplate, ensureElement } from '../../../utils/utils';

export class Success implements ISuccess {
	constructor(private settings: successSettings) {}

	get template() {
		const orderTemplate = cloneTemplate('#success');

		ensureElement(
			'.order-success__description',
			orderTemplate
		).innerText = `Списано ${this.settings.res.total} синапсов`;
		ensureElement('.order-success__close', orderTemplate).onclick =
			this.settings.onClick;

		return orderTemplate;
	}
}
