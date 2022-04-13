import { BaCountryPropertyReportObjectBase } from "./ba.countryProperty.report.object.base";

class BaCountryPropertyReportObjectActionButtons extends BaCountryPropertyReportObjectBase {
  protected get $rootActionButtons() {
    return this.$root.$(`.//div[starts-with(@class,'ReportHeader_root')]`);
  }
  get $mainActionButtons() {
    return this.$rootActionButtons.$(`.//div[starts-with(@class,'ReportHeader_mainButtons')]`);
  }
}
