import { settings } from "../../../../utils/constants";
import {Api} from "../../../base/api";
import {OrderFetchType} from "../types";

export class OrdersService {

    postOrder(order: OrderFetchType) {
        return this.api.post("/order", order)
    }

    constructor(private api:Api) {
    }
}