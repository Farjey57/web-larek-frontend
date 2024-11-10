import {IProduct} from "../../../types";
import {ProductsService} from "./Services/ProductsService";

export class ProductModel {
    private _products: IProduct[] = []

    public refresh = async (cb?: (data: IProduct[]) => void) => {
        this.service.getAllProducts().then((data) => {
          this.setProducts(data.items)
          return data.items
        }).then((data) => cb && cb(data))
    }

    getProducts() {
        return this._products;
    }

    getProductById(id: string) {
        return this._products.find(product => product.id === id);
    }

    setProducts(products: IProduct[]) {
        this._products = products;
    }

    constructor(private service: ProductsService) {
    }
}