import { KronaOrderDpaResidentialOrderCardBase } from "./krona.order.dpa.residential.orderCard.base";

export class KronaOrderDpaResidentialOrderCardObjectInfoBlock extends KronaOrderDpaResidentialOrderCardBase {
  get $linkDownloadReport() {
    return this.$objectInfoRoot.$(`//a[contains(@href,'/report?')]`);
  }
  get $linkDownloadConclusion() {
    return this.$objectInfoRoot.$(`//a[contains(@href,'/conclusion?')]`);
  }

  waitForLoad() {
    this.$objectInfoRoot.waitForExist();
    this.$objectInfoRoot.waitForDisplayed();
    browser.waitUntil(
      () =>
        this.$linkDownloadReport.isExisting() === true &&
        this.$linkDownloadConclusion.isExisting() === true,
      {
        timeout: 30000,
        timeoutMsg: `Блок данных по объекту оценки НЕ прогрузился.`,
      }
    );
  }
}
