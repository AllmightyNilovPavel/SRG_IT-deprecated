import { BaCountryPropertyReportFactory } from "./PageFactories/ba.countryProperty.report.factory";
import { BaCountryPropertyReportObjectBase } from "./PageObjects/ba.countryProperty.report.object.base.test";

class BaCountryPropertyReportPage {
  BASE = new BaCountryPropertyReportFactory();
}

export const baCountryPropertyReportPage = new BaCountryPropertyReportPage();
