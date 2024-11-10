import { IProduct, UserData } from "../..";
import { OrderFetchType} from "./Service/Service";

export interface IOrdersModel {
  productsList: IProduct[];
  dataOrder: OrderFetchType;
  user: Partial<UserData>;
  count: number;

  addProduct(product: IProduct): void; 
  removeProduct(id: string): void; 
  hasProduct(id: string): boolean; 
  clearOrder(): void;
}