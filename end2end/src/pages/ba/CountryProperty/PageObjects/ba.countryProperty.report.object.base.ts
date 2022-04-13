export class BaCountryPropertyReportObjectBase {
  path = "/reports/country_property";

  protected get $root() {
    return browser.$(`//div[starts-with(@class,'BaseLayout_content')]`);
  }
}
