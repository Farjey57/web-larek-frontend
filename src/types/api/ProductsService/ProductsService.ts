import { IProduct } from '../..';

export interface IProductsService {
	getAllProducts(): Promise<IProduct[]>;
}

export type ProductsFetchType<T> = {
	total: number;
	items: T[];
};
