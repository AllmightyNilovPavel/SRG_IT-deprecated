import { KronaOrderDpaResidentialOrderCardBase } from "./krona.order.dpa.residential.orderCard.base";

export class KronaOrderDpaResidentialOrderCardBaReportDataTab extends KronaOrderDpaResidentialOrderCardBase {
  /** Вкладка "Электронный отчёт" */
  private get $baReportDataRoot() {
    return this.$root.$(`.//div[@role='tabpanel'][@id='autoForm-e-report']`);
  }

  waitForLoad() {
    this.$baReportDataRoot.waitForExist();
    this.$baReportDataRoot.waitForDisplayed();
    browser.waitUntil(() => this.$baReportDataRoot.getAttribute("class").match("active") !== null, {
      timeout: 30000,
      timeoutMsg: `Вкладка "Верификация" не прогрузилась.`,
    });
  }
}
