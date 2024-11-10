import {
	cloneTemplate,
	ensureAllElements,
	ensureElement,
} from '../../../../utils/utils';
import { PaymentType, UserData } from '../../../model/Orders/Model';

export class FormDeliveryView implements Partial<UserData> {
	payment: PaymentType;
	address: string;
	error: HTMLElement;
	submitButton: HTMLElement;

	constructor(private settings: FormDeliveryViewSettings) {}

	get template() {
		const orderTemplate = cloneTemplate('#order');
		this.submitButton = ensureElement('.order__button', orderTemplate);
		this.error = ensureElement('.form__errors', orderTemplate);

		ensureAllElements<HTMLButtonElement>('.button_alt', orderTemplate).forEach(
			(button, _, arr) => {
				button.onclick = (e) => {
					this.btnToggle(e, arr);
				};
			}
		);

		ensureElement<HTMLInputElement>('.form__input[name=address]', orderTemplate).addEventListener(
			'input',
			(e) => {
				this.address = (e.target as HTMLInputElement).value;
        this.settings.onChangeForm(this);
			}
		);

		this.submitButton.onclick = () => {
			if (this.validate())
				this.settings.onSubmit({
					payment: this.payment,
					address: this.address,
				});
		};
		this.validate();

		return orderTemplate;
	}

	btnToggle(e: MouseEvent, listBtn: HTMLButtonElement[]): void {
		const activeBtn = e.currentTarget as HTMLButtonElement;
		const activeBtnName = activeBtn.getAttribute('name') as PaymentType;
		if (this.payment != activeBtnName) {
			this.payment = activeBtnName;
			listBtn.forEach((btn) => btn.classList.remove('button_alt-active'));
			activeBtn.classList.add('button_alt-active');
			this.settings.onChangeForm(this);
		}
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
		return !!this.address && !!this.payment;
	}
}

export type FormDeliveryViewSettings = {
	onChangeForm(form: FormDeliveryView): void;
	onSubmit(data: Partial<UserData>): void;
};
