import { Api } from '../../../base/api';
import { IOrdersService, OrderFetchType, success } from '../../../../types/model/Orders/Service/Service';

export class OrdersService implements IOrdersService {
	postOrder(order: OrderFetchType): Promise<success> {
		return this.api.post('/order', order) as Promise<success>;
	}

	constructor(private api: Api) {}
}