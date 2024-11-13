import { Api } from '../../base/api';
import {
	IOrdersService,
	OrderFetchType,
	OrderResultType,
} from '../../../types/api/OrderService/OrderService';

export class OrdersService implements IOrdersService {
	constructor(private api: Api) {}

	postOrder(order: OrderFetchType): Promise<OrderResultType> {
		return this.api.post('/order', order).then((data: OrderResultType) => data);
	}
}
