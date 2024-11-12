import { IProduct } from '../../../types';
import {
	IProductsService,
	ProductsFetchType,
} from '../../../types/api/ProductsService/ProductsService';
import { Api } from '../../base/api';

export class ProductsService implements IProductsService {
	constructor(private api: Api, private readonly cdn: string) {}

	getAllProducts(): Promise<IProduct[]> {
		return this.api.get('/product/').then((data: ProductsFetchType<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}
}
