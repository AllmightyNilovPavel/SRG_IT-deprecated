import { KronaOrderDpaResidentialGetters } from "./functions/krona.order.dpa.residential.getters";
import { KronaOrderDpaResidentialNewOrderBasicActions } from "./functions/krona.order.dpa.residential.newOrder.basicActions";
import { KronaOrderDpaResidentialSetters } from "./functions/krona.order.dpa.residential.setters";
import { KronaOrderDpaResidentialNewOrder } from "./krona.order.dpa.residential.newOrder";

class KronaOrderDpaResidentialOrderPage {
  NEW_ORDER_BASE = new KronaOrderDpaResidentialNewOrder();
  BASIC_ACTIONS = new KronaOrderDpaResidentialNewOrderBasicActions();
  GET_DATA = new KronaOrderDpaResidentialGetters();
  SET_DATA = new KronaOrderDpaResidentialSetters();
}
/** Страница заказа "БЗО.Недвижимость_Заказ" */
export const kronaOrderDpaResidentialOrderPage = new KronaOrderDpaResidentialOrderPage();
