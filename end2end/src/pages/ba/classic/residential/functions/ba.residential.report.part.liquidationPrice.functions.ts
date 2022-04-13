import { BaResidentialReportPartLiquidationPrice } from "../declarations/ba.residential.report.part.liquidationPrice";

export class BaResidentialReportPartLiquidationPriceFunctions extends BaResidentialReportPartLiquidationPrice {
  setRiskFreeRate(riskFreeRate?: number) {
    if (!riskFreeRate) {
      this.$button_getRiskFreeRate.scrollIntoView({ block: "center", inline: "center" });
      this.$button_getRiskFreeRate.waitForClickable();
      this.$button_getRiskFreeRate.click();
    } else {
      this.$input_riskFreeRate.scrollIntoView({ block: "center", inline: "center" });
      this.$input_riskFreeRate.waitForClickable();
      this.$input_riskFreeRate.clearValue();
      this.$input_riskFreeRate.setValue(riskFreeRate.toString());
    }
  }
  getRiskFreeRate() {
    let value = this.$input_riskFreeRate.getValue();
    let text = this.$input_riskFreeRate.getText();

    if (value === null || value === "") return text;
    else if (text === null || text === "") return value;
    else return 0;
  }
  waitForLoad() {
    browser.waitUntil(
      () =>
        browser.$(`//*[@id="report-nav-bar"]//a[@href="#tab11"]/..`).getAttribute("class") ===
          "active" && this.$root.isDisplayed() === true
    );
  }
}
