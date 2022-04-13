import { BaCountryPropertyReportObjectBase } from "../PageObjects/ba.countryProperty.report.object.base";

export class BaCountryPropertyReportFactory extends BaCountryPropertyReportObjectBase {
  waitForLoad() {
    browser.waitUntil(() => browser.getUrl().match(this.path)! == null);
    this.closeInfoModal();
  }
  closeInfoModal() {
    browser.pause(1000);
    while (this.$modalsUniversalRoot.isDisplayed()) {
      this.$modalUniversalCloseButton.waitForClickable();
      this.$modalUniversalCloseButton.click();
    }
  }
}

// export const baCountryPropertyReportFactory = new BaCountryPropertyReportFactory()
