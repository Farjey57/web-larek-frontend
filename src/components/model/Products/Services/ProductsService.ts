import { IProductsService, ProductsFetchType } from '../../../../types/model/Products/Service/Service';
import { Api } from '../../../base/api';

export class ProductsService implements IProductsService {
	getAllProducts() {
		return this.api.get('/product/') as Promise<ProductsFetchType>;
	}

	constructor(private api: Api) {}
}
