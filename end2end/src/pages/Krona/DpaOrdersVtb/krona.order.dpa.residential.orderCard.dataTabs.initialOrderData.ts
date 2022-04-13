import { KronaOrderDpaResidentialOrderCardBase } from "./krona.order.dpa.residential.orderCard.base";

export class KronaOrderDpaResidentialOrderCardInitialOrderDataTab extends KronaOrderDpaResidentialOrderCardBase {
  /** Вкладка "Заказ" */
  private get $initialOrderDataRoot() {
    return this.$root.$(`.//div[@role='tabpanel'][@id='autoForm-order']`);
  }
  get $inputOrderId() {
    return this.$initialOrderDataRoot.$(`.//input[@id='orderId']`);
  }

  waitForLoad() {
    this.$initialOrderDataRoot.waitForExist();
    this.$initialOrderDataRoot.waitForDisplayed();
    browser.waitUntil(
      () => this.$initialOrderDataRoot.getAttribute("class").match("active") !== null,
      { timeout: 30000, timeoutMsg: `Вкладка "Заказ" не прогрузилась.` }
    );
  }
}
