import { debugLogging } from "modules";
import options from "options";
import { KronaOrderDpaResidentialNewOrder } from "../krona.order.dpa.residential.newOrder";

export class KronaOrderDpaResidentialNewOrderBasicActions extends KronaOrderDpaResidentialNewOrder {
  open(althost?: string) {
    debugLogging(`Открываем страницу класса: ${KronaOrderDpaResidentialNewOrder.name}`);
    althost ? browser.url(althost + this.path) : browser.url(options.krona.host + this.path_new);
    this.waitForLoad();
  }
  /** Функция ожидания загрузки страницы */
  waitForLoad() {
    browser.waitUntil(
      () =>
        browser.getUrl().match(this.path) !== null ||
        (this.$info_orderNumber.isDisplayedInViewport() &&
          this.$info_orderNumber.getValue() !== null &&
          this.$selector_appraiser.getValue() !== null)
    );
    this.$info_orderNumber.waitForExist();
    // browser.waitUntil(() => this.$info_orderNumber.isDisplayedInViewport());
  }
  /** Функция Сохранения черновика заказа */
  saveOrderDraft() {
    this.$button_saveOrder.scrollIntoView();
    this.$button_saveOrder.waitForClickable();
    this.$button_saveOrder.click();
    browser.waitUntil(() => this.$info_orderNumber.isDisplayedInViewport());
  }
  /** Функция отправки заказа" */
  sendOrder() {
    const fileThumbnail = browser.$(
      `//label[contains(text(),'Задание на оценку')]/..//li[@class='qq-file-id-0 qq-upload-success']`
    );
    this.$input_comment.scrollIntoView();
    this.$input_comment.setValue("Это заказ создан с помощью автотестa.");
    browser.pause(10000);
    this.$button_sendOrder.scrollIntoView();
    this.$button_sendOrder.waitForClickable();
    fileThumbnail.waitForExist();
    fileThumbnail.waitForDisplayed();
    this.$button_sendOrder.click();
    browser.waitUntil(() => browser.getUrl().match("valuation/order/vtb/dpa/orders") !== null, {
      timeout: 30000,
      timeoutMsg: `Ошибка при отправке заказа.`,
    });
  }
}
