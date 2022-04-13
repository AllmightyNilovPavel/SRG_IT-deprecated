import options from "options";

export class KronaOrderDpaResidentialOrderCardBase {
  path = "/valuation/dpa/order/auto/ver2/";

  /** Корень страницы */
  protected get $root() {
    return $(`//div[@class='container-fluid auto']`);
  }
  /** Корень блока данных отчёта */
  protected get $objectInfoRoot() {
    return this.$root.$(`.//div[@class='autoForm-header-left']`);
  }
  /** Корень блока данных заказа и истории верификации */
  protected get $orderInfoRoot() {
    return this.$root.$(`.//form[@id='dpaOrderForm']`);
  }
  /** Строка навигации между вкладками */
  get $orderInfoSmallNavigationBar() {
    return this.$orderInfoRoot.$(`.//ul[@id='autoForm-tabs']`);
  }
  get $buttonCloneOrder() {
    return this.$orderInfoRoot.$(`//button[@id='cloneOrderVer2']`);
  }

  _waitForLoad() {
    this.$root.waitForExist({
      timeout: 20000,
      timeoutMsg: `Карточка заказа не загрузилась`,
    });
    browser.waitUntil(() => browser.getUrl().match("valuation/dpa/order/auto/ver2") !== null, {
      timeout: 20000,
      timeoutMsg: `Карточка заказа не загрузилась`,
    });
  }
  openOrderCardById(orderId: string | number) {
    browser.url(options.krona.host + this.path + orderId);
    this._waitForLoad();
  }
}
