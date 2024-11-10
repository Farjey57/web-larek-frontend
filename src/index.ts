import './scss/styles.scss';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { ProductsService } from './components/model/Products/Services/ProductsService';
import { EventEmitter } from './components/base/events';
import { ProductModel } from './components/model/Products/Model';
import { AppPresenter } from './components/presenter/App/AppPresenter';
import { OrderModel } from './components/model/Orders/Model';
import { OrdersService } from './components/model/Orders/Service/OrdersService';

const api = new Api(API_URL, settings);

const productService = new ProductsService(api);
const orderService = new OrdersService(api);

const productsModel = new ProductModel(productService);
const orderModel = new OrderModel(orderService);

const eventEmitter = new EventEmitter();

const appPresenter = new AppPresenter(productsModel, orderModel, eventEmitter);
