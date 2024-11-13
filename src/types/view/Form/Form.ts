export interface IFormState {
	valid: boolean;
	errors: string;
  render(state: IFormState): HTMLFormElement;
}

export interface IFormSettings<T> {
	onChangeForm(field: keyof T, value: string): void;
	onSubmit(formName: string): void;
}