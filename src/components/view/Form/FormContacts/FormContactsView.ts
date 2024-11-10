import { cloneTemplate, ensureElement } from '../../../../utils/utils';
import { UserData } from '../../../model/Orders/Model';

export class FormContactsView implements Partial<UserData> {
	email: string;
	phone: string;
	error: HTMLElement;
	submitButton: HTMLElement;

	constructor(private settings: FormContactsViewSettings) {}

	get template() {
		const orderTemplate = cloneTemplate('#contacts');
    this.error = ensureElement('.form__errors', orderTemplate);
    this.submitButton = ensureElement('.button', orderTemplate);

    ensureElement<HTMLInputElement>('.form__input[name=email]', orderTemplate).addEventListener(
			'input',
			(e) => {
				this.email = (e.target as HTMLInputElement).value;
        this.settings.onChangeForm(this);
			}
		);

    ensureElement<HTMLInputElement>('.form__input[name=phone]', orderTemplate).addEventListener(
			'input',
			(e) => {
				this.phone = (e.target as HTMLInputElement).value;
        this.settings.onChangeForm(this);
			}
		);

    this.submitButton.onclick = () => {
			if (this.validate())
				this.settings.onSubmit({
					email: this.email,
					phone: this.phone,
				});
		};

    this.validate();

		return orderTemplate;
	}

  validate(): boolean {
		if (!this.isValid()) {
			this.error.innerText = 'Ну и хуйню ты заполнил';
      this.submitButton.setAttribute('disabled', 'disabled');
			return false;
		} else {
			this.error.innerText = 'Молодец (иди на хуй)';
			this.submitButton.removeAttribute('disabled');
			return true;
		}
	}

	isValid(): boolean {
		return !!this.email && !!this.phone;
	}
}

export type FormContactsViewSettings = {
  onChangeForm(form: FormContactsView): void;
	onSubmit(data: Partial<UserData>): void;
};
