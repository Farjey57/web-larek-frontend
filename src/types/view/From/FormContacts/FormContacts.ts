import { UserData } from '../../..';

export interface IFormContactsView extends Partial<UserData> {
	readonly template: HTMLElement;
	error: HTMLElement;
	submitButton: HTMLElement;
	validate(): boolean;
	isValid(): boolean;
}

export type FormContactsViewSettings = {
	onChangeForm(form: IFormContactsView): void;
	onSubmit(data: Partial<UserData>): void;
};
