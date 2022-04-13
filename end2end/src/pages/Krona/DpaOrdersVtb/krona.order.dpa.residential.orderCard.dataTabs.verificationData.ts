import { forEach } from "lodash";
import { debugLogging } from "modules";
import { KronaOrderDpaResidentialOrderCardBase } from "./krona.order.dpa.residential.orderCard.base";

export class KronaOrderDpaResidentialOrderCardVerificationTab extends KronaOrderDpaResidentialOrderCardBase {
  /** Вкладка "Верификация" */
  private get $verificationDataRoot() {
    return this.$root.$(`.//div[@role='tabpanel'][@id='autoForm-verification']`);
  }
  private get $verificationHistoryTableRoot() {
    return this.$verificationDataRoot.$(`.//table/tbody`);
  }
  private get $verificationHistoryTableAllReports() {
    return this.$verificationHistoryTableRoot.$$(`./tr`);
  }
  get $verificationReportStatus() {
    return this.$verificationHistoryTableRoot.$(`./tr/td[3]`);
  }
  get $verificationReportCalculationLink() {
    return this.$verificationDataRoot.$(`.//td/a[contains(text(),'Посмотреть')]`);
  }

  waitForLoad() {
    this.$verificationDataRoot.waitForExist();
    this.$verificationDataRoot.waitForDisplayed();
    browser.waitUntil(
      () => this.$verificationDataRoot.getAttribute("class").match("active") !== null,
      { timeout: 30000, timeoutMsg: `Вкладка "Верификация" не прогрузилась.` }
    );
  }
  /**
   * Метод который возвращает статус отчёта из таблицы верификации.
   * Если параметр не указан - возвращается статус последнего отчёта
   * @param reportNumber
   * @returns статус отчёта в виде строки
   */
  getReportVerificationStatus(reportNumber?: number): string {
    if (!reportNumber) {
      let lastReportNumber = this.$verificationHistoryTableAllReports.length;
      debugLogging(`Кол-во отчётов в реестре верификации: ${lastReportNumber}`);
      return this.$verificationHistoryTableAllReports[lastReportNumber - 1].$(`./td[3]`).getText();
    }
    this.$verificationHistoryTableAllReports.forEach((value, index) =>
      console.log(`Статус отчёта ${index}: ${value.$(`./td[3]`).getText()}`)
    );
    return this.$verificationHistoryTableAllReports[reportNumber - 1].$(`./td[3]`).getText();
  }
  /**
   * Метод который возвращает кол-во отчётов в таблице верификации
   * @returns число
   */
  getVerificationReportsCount(): number {
    return this.$verificationHistoryTableAllReports.length;
  }
}
