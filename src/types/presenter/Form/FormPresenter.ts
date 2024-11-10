import { PaymentType, UserData } from '../..';

export interface IFormPresenter extends UserData {
	address: string;
	email: string;
	payment: PaymentType;
	phone: string;
  addListeners(): void;
}
