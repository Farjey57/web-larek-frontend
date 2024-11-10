import { IProduct } from '../../..';

export interface IProductsService {
	getAllProducts(): Promise<ProductsFetchType>;
}

export type ProductsFetchType = {
	total: number;
	items: IProduct[];
};
