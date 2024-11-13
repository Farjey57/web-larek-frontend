import { IFormSettings, IFormState } from '../../../types/view/Form/Form';
import { cloneTemplate, ensureElement } from '../../../utils/utils';

export abstract class Form<T> implements IFormState {
	protected _element: HTMLFormElement;
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(
		protected template: string,
		protected settings: IFormSettings<T>
	) {
		this._element = cloneTemplate<HTMLFormElement>(template);
		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this._element
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this._element);

		this._element.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.settings.onChangeForm(field, value);
		});

		this._element.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.settings.onSubmit(this._element.name);
		});
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string) {
		this._errors.textContent = value;
	}

	render(state: Partial<T> & IFormState): HTMLFormElement {
		const { valid, errors, ...inputs } = state;
		Object.assign(this, valid, errors, inputs);
		return this._element;
	}
}
