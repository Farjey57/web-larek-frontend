# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных, используемые в приложении

IProduct (Интерфейс):
   
```ts
interface IProduct {
  id: number;        // Уникальный идентификатор товара
  description: string;      // Описание товара
  image: string;     // URL изображения товара
  title: string;     // Название товара
  category: string;  // Категория товара
  price: number;     // Цена товара
}
```

IOrder (Интерфейс):

```ts
interface IOrder {
  payment: string; // online | cash (enum?)?
  address: string;
  email: string;
  phone: string;
  products: IProduct[];
}
```

Данные отображаемые в списке товаров

```ts
type TProductList = Pick<IProduct, 'category' | 'title' | 'image' | 'price' >;
```
Данные отображаемые в форме в корзине
```ts
type TProductСart = Pick<IProduct, 'price' | 'title'>
```
#### ФОРМА ЗАКАЗА

Первый шаг оформления форма name="order"
```ts
type TUserOrder = Pick<IOrder, 'payment' | 'address'>
```
Второй шаг оформления форма name="contacts"
```ts
type TUserСontacts = Pick<IOrder, 'email' | 'phone'>
```


## Архтектура приложения

Архитектура проекта основана на паттерне MVP (Model-View-Presenter):
- модель - управляет данными приложения, включая товары и корзину;
- отображение - отображает данные пользователю и обрабатывает пользовательский ввод;
- презентер - отвечает за связь представления и данных .

### Базовый код ( не относится к слоям)

### ProductService

Принимает в констурктор экземп Api. Внутри реализовывает получить все продукты и прочее.

### OrderService

Для отправки заказа.

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы: 
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие   


### Слой данных

### Класс ProductsData
Класс `Products` управляет данными о товарах.
Конструктор класса принимает инстант брокера событий\
Поля:
- `_products: IProduct[]` - Хранит массив товаров.
- `events: IEvents` - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Методы:
- `getProduct(productId: number): IProduct` - получение товара по id.
- геттер и сеттер для получения и сохранения массива товаров.

### Класс CartData
Класс `CartData` управляет данными корзины. 
Конструктор класса принимает инстант брокера событий\
Поля:
- `_carts: IProduct[]` - Хранит товары, добавленные в корзину.
- `events: IEvents` - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Методы:
- `addToCart(product: IProduct):void` - Добавляет товар в корзину.
- `removeFromCart(productId: number):void` - Удаляет товар из корзины.
- `clearCart():void` - Очищает корзину.
- `checkProductInCart(productId: number): bollean` - проверяет есть ли товар в корзине.
- геттер получения всей корзины.

### Класс OrderData

Класс отвечает за хранение и логику работы с данными пользователя.\
Конструктор класса принимает инстант брокера событий и `order: IOrder`.\
Поля:
- `order: IOrder`
- `events: IEvents` - экземпляр класса `EventEmitter` для инициации событий при изменении данных.
- `service: OrderService` - экземпляр класса OrderService для АПИ

Методы:
- `sendOrder():` - вызывает метод АПИ отвечающий за оформление заказа

<!-- - `checkValidationUserOrder<T>(data: Record<keyof T, string>): boolean` - проверяет объект с данными пользователя на валидность в зависимости (первый шаг, второй шаг и общий заказ при необходимости). -->


### Слой представления View
Все классы представления отвечают за отображение внутри контейнера (DOM-элемента) передаваемых в них данных

### класс View

Базовый класс для всех классов представления.
методы:
- `render():HtmlElement` - метод возвращает полностью заполненную карточку с установленными слушателями

#### Класс ViewProduct

Отвечает за отображение товара, задавая в товаре данные названия, изображения, категории, цены, описания. Класс используется для отображения товаров на странице сайта. В конструктор класса передается DOM элемент темплейта, что позволяет при необходимости формировать карточки разных вариантов верстки, а также параметры (данные товара). В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.\
Поля класса содержат элементы разметки элементов карточки.\
Методы:
- `render(): HTMLElement` - метод возвращает полностью заполненную карточку с установленными слушателями

#### Класс ViewProductContainer
Отвечает за отображение блока с карточками товаров на главной странице. Предоставляет сеттер `container` для полного обновления содержимого. В конструктор принимает контейнер, в котором размещаются карточки.

#### Класс ViewModal

Реализует модальное окно. Так же предоставляет методы `open` и `close` для управления отображением модального окна. Устанавливает слушатели на клавиатуру, для закрытия модального окна по Esc, на клик в оверлей и кнопку-крестик для закрытия попапа.  
- `constructor(container: HTMLElement, events: IEvents)` Конструктор принимает `HTMLElement`, который будет являться контейнером отображения всех модальных окон и экземпляр класса `EventEmitter` для возможности инициации событий.



### Реализация процессов в приложении

Процессы в приложении реализованы с помощью событий, которые позволяют различным компонентам взаимодействовать друг с другом без жесткой связки. Это достигается с помощью класса EventEmitter, который позволяет подписываться на события и уведомлять слушателей о произошедших изменениях.

*Список всех событий, которые могут генерироваться в системе:*\
*События изменения данных (генерируются классами моделями данных)*
- `basket:changed` - изменение корзины
- `user:dataUpdate` - обновление данных введенных пользователем

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- `modal:open` - открытие модального окна
- `modal-cardPreview:open` - открытие модального окна с товаром
- `modal-basket:open` - открытие модального окна корзины
- `modal-order:open` - открытие модального окна с формой доставки и оплаты
- `modal-contacts:open` - открытие модального окна с формой контактов
- `order:submit` - отправка заказа на сервер

- `basket:add` - добавление товара в корзину
- `basket:delete` - удаление товара из корзины

- `modal-order:input` - изменение данных в форме с данными доставки и оплаты
- `modal-contacts:input` - изменение данных в форме контактов пользователя 

- `modal-order:submit` - сохранение данных пользователя в этапе выбора доставки и оплаты
- `modal-contacts:submit` - сохранение данных пользователя на этапе указания контактов пользователя
- `modal-pay:post` - при нажатии на кнопку оплатить отправка заказа на сервер

- `modal-order:validation` - событие, сообщающее о необходимости валидации данных доставки и оплаты
- `modal-contacts:validation` - событие, сообщающее о необходимости валидации данных контактов пользователя 
