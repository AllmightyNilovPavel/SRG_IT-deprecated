import options from "options";
import { KronaEnumOrderDpaResidentialOrderCardDataTabs } from "./enums";
import { KronaOrderDpaResidentialOrderCardBase } from "./krona.order.dpa.residential.orderCard.base";
import { KronaOrderDpaResidentialOrderCardBaReportDataTab } from "./krona.order.dpa.residential.orderCard.dataTabs.baReportData";
import { KronaOrderDpaResidentialOrderCardInitialOrderDataTab } from "./krona.order.dpa.residential.orderCard.dataTabs.initialOrderData";
import { KronaOrderDpaResidentialOrderCardVerificationTab } from "./krona.order.dpa.residential.orderCard.dataTabs.verificationData";
import { KronaOrderDpaResidentialOrderCardObjectInfoBlock } from "./krona.order.dpa.residential.orderCard.objectInfoBlock";

class KronaOrderDpaResidentialOrderCard {
  ORDER_CARD_BASE = new KronaOrderDpaResidentialOrderCardBase();
  OBJECT_INFO_BLOCK = new KronaOrderDpaResidentialOrderCardObjectInfoBlock();
  INITIAL_ORDER_DATA_TAB = new KronaOrderDpaResidentialOrderCardInitialOrderDataTab();
  BA_REPORT_DATA_TAB = new KronaOrderDpaResidentialOrderCardBaReportDataTab();
  VERIFICATION_DATA_TAB = new KronaOrderDpaResidentialOrderCardVerificationTab();

  openTab(tabName: KronaEnumOrderDpaResidentialOrderCardDataTabs) {
    let target: WebdriverIO.Element;
    target = this.ORDER_CARD_BASE.$orderInfoSmallNavigationBar.$(`.//a[@href='${tabName}']`);
    target.waitForClickable();
    target.click();

    switch (tabName) {
      case KronaEnumOrderDpaResidentialOrderCardDataTabs.INITIAL_ORDER_DATA:
        this.INITIAL_ORDER_DATA_TAB.waitForLoad();
        break;
      case KronaEnumOrderDpaResidentialOrderCardDataTabs.BA_REPORT_DATA:
        this.BA_REPORT_DATA_TAB.waitForLoad();
        break;
      case KronaEnumOrderDpaResidentialOrderCardDataTabs.VERIFICATION:
        this.VERIFICATION_DATA_TAB.waitForLoad();
        break;
      default:
        break;
    }
  }
  /**
   * Метод для прямого перехода в карточку уже известного заказа
   * @param orderId номер заказа ДРВ
   */
  openOrderCardByOrderId(orderId: string | number) {
    browser.url(options.krona.host + `/valuation/dpa/order/auto/ver2/${orderId}`);
    this.ORDER_CARD_BASE._waitForLoad();
  }
}
/**
 * Карточка заказа ВТБ ДРВ
 * из реестра БЗО.Недвижимость_Заказ
 */
export const kronaOrderDpaResidentialOrderCard = new KronaOrderDpaResidentialOrderCard();
