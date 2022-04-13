import { BaResidentialReportPartAdjustments } from "../declarations/ba.residential.report.part.adjustments";

export class BaResidentialReportPartAdjustmentsFunctions extends BaResidentialReportPartAdjustments {
  setPriceRange(from: number, to: number) {
    this.$input_costRangeFrom.scrollIntoView({ block: "center", inline: "center" });
    this.$input_costRangeFrom.waitForClickable();
    this.$input_costRangeFrom.clearValue();
    this.$input_costRangeFrom.setValue(from.toString());

    this.$input_costRangeTo.scrollIntoView({ block: "center", inline: "center" });
    this.$input_costRangeTo.waitForClickable();
    this.$input_costRangeTo.clearValue();
    this.$input_costRangeTo.setValue(to.toString());
  }
  waitForLoad() {
    browser.waitUntil(
      () =>
        browser.$(`//*[@id="report-nav-bar"]//a[@href="#tab10"]/..`).getAttribute("class") ===
        "active"
    );
  }
}
