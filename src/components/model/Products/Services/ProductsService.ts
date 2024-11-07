import {Api} from "../../../base/api";
import {ProductsFetchType} from "../types";

export class ProductsService {

    getAllProducts() {
        return this.api.get("/product/") as Promise<ProductsFetchType>;
    }

    getProductById(id: number) {
        return this.api.get(`/products/${id}`);
    }

    constructor(private api:Api) {
    }
}