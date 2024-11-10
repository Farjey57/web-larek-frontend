import { IProduct } from '../../../types';
import { IProductsModel } from '../../../types/model/Products/ProductsModel';
import { ProductsService } from './Services/ProductsService';

export class ProductModel implements IProductsModel {
	private _products: IProduct[] = [];

	public refresh = async (cb?: (data: IProduct[]) => void) => {
		const data = await this.service.getAllProducts();
		this.setProducts(data.items);
		cb && cb(data.items);
		return data.items;
	};

	getProducts() {
		return this._products;
	}

	getProductById(id: string) {
		return this._products.find((product) => product.id === id);
	}

	setProducts(products: IProduct[]) {
		this._products = products;
	}

	constructor(private service: ProductsService) {}
}
