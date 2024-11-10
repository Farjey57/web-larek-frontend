//Данные

export type IProduct = {
  category: string;
  description: string;
  id: string;
  image: string;
  price: number;
  title: string;
}

export type UserData = {
	phone: string;
	email: string;
	address: string;
	payment: PaymentType;
};

export enum PaymentType {
	card = 'card',
	cash = 'cash',
}