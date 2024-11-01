//Данные

export interface IProduct {
  category: string;
  description: string;
  id: string;
  image: string;
  price: number;
  title: string;
}

export interface IShopper {
  payment: string; 
  address: string;
  email: string;
  phone: string;
}

//Данные отображаемые в списке товаров
export type TProductList = Pick<IProduct, 'category' | 'title' | 'image' | 'price' >;

//Данные отображаемые в форме в корзине
export type TProductСart = Pick<IProduct, 'price' | 'title'>

/* ФОРМА ЗАКАЗА */

//Первый шаг оформления форма name="order"
export type TUserOrder = Pick<IShopper, 'payment' | 'address'>

//Второй шаг оформления форма name="contacts"
export type TUserСontacts = Pick<IShopper, 'email' | 'phone'>



//Классы модели данных
export interface IProductData {
  items: IProduct[];
  preview: string | null;
}