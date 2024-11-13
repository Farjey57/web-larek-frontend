import { UserData } from '../../../../types';
import { IFormSettings } from '../../../../types/view/Form/Form';
import { Form } from '../Form';

export class FormContactsView extends Form<UserData> {
	constructor(template: string, settings: IFormSettings<UserData>) {
		super(template, settings);
	}

	set phone(value: string) {
		(this._element.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this._element.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}
