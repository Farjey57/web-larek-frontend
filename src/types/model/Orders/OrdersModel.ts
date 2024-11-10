import { IProduct, UserData } from "../..";
import { success } from "./Service/Service";

export interface IOrdersModel {
  productsList: IProduct[];
  user: Partial<UserData>;

  sendOrder(): Promise<success>;
  addProduct(product: IProduct): number; 
  removeProduct(id: string): number; 
  hasProduct(id: string): boolean; 
  clearOrder(): number;
}