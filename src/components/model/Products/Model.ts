import { IProduct } from '../../../types';
import { IProductsModel } from '../../../types/model/Products/ProductsModel';

export class ProductModel implements IProductsModel {
	private _products: IProduct[] = [];

	getProducts() {
		return this._products;
	}

	getProductById(id: string): IProduct {
		return this._products.find((product) => product.id === id);
	}

	setProducts(products: IProduct[]) {
		this._products = products;
	}
}
