import { BaReactDpaOrdersListFactory } from "./PageFactories/ba.react.orders.registry.dpaOrders.factory";

class BaReactOrders {
  DPA_ORDERS = new BaReactDpaOrdersListFactory();
}

/** БО. Реакт. Заказы. */
export const baReactOrders = new BaReactOrders();
