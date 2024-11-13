import { PaymentType, UserData } from '../../../../types';
import { IFormSettings } from '../../../../types/view/Form/Form';
import { ensureAllElements } from '../../../../utils/utils';
import { Form } from '../Form';

export class FormOrderView extends Form<UserData> {
	private inputRadioButton: HTMLButtonElement[];
	private activeRadioButton: HTMLButtonElement | null;

	constructor(template: string, settings: IFormSettings<UserData>) {
		super(template, settings);

		this.inputRadioButton = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			this._element
		);
		this.activeRadioButton = null;
		this.inputRadioButton.forEach((button) => {
			button.onclick = (e) => {
				this.btnToggle(e);
			};
		});
	}

	private btnToggle(e: MouseEvent): void {
		const activeBtn = e.currentTarget as HTMLButtonElement;
		if (activeBtn !== this.activeRadioButton) {
			this.activeRadioButton?.classList.remove('button_alt-active');
			activeBtn.classList.add('button_alt-active');
			this.activeRadioButton = activeBtn;
			const value = this.activeRadioButton.name as PaymentType;
			this.settings.onChangeForm('payment', value);
		}
	}

	set address(value: string) {
		(this._element.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	set payment(value: HTMLButtonElement | null) {
		this.activeRadioButton?.classList.remove('button_alt-active');
		this.activeRadioButton = value;
		this.activeRadioButton?.classList.add('button_alt-active');
	}
}
