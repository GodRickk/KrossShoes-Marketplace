import { Customer as _Customer } from './customer';
import { Product as _Product } from './product';
import { Order as _Order } from './order';
import { Review as _Review } from './review';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PrismaModel {
  export class Customer extends _Customer {}
  export class Product extends _Product {}
  export class Order extends _Order {}
  export class Review extends _Review {}

  export const extraModels = [Customer, Product, Order, Review];
}
