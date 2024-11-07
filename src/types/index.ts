//Данные

export interface IProduct {
  category: string;
  description: string;
  id: string;
  image: string;
  price: number;
  title: string;
}

export interface IOrder {
  payment: string; // online | cash (enum?)?
  address: string;
  email: string;
  phone: string;
  products: IProduct[];
}

export type TUserData = Omit<IOrder, 'products'>

//Данные отображаемые в списке товаров
export type TProductList = Pick<IProduct, 'category' | 'title' | 'image' | 'price' >;

//Данные отображаемые в форме в корзине
export type TProductСart = Pick<IProduct, 'price' | 'title'>

/* ФОРМА ЗАКАЗА */

//Первый шаг оформления форма name="order"
export type TUserOrder = Pick<IOrder, 'payment' | 'address'>

//Второй шаг оформления форма name="contacts"
export type TUserСontacts = Pick<IOrder, 'email' | 'phone'>