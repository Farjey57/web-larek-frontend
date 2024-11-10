import { UserData } from "../../..";
import { FormDeliveryView } from "../../../../components/view/Form/FormDelivery/FormDeliveryView";


export type FormDeliveryViewSettings = {
	onChangeForm(form: FormDeliveryView): void;
	onSubmit(data: Partial<UserData>): void;
};

export interface IFormDeliveryView extends Partial<UserData> {
	template: HTMLElement;
	error: HTMLElement;
	submitButton: HTMLElement;
	btnToggle(e: MouseEvent, listBtn: HTMLButtonElement[]): void;
	validate(): boolean;
	isValid(): boolean;
}
