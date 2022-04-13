export class BaCountryPropertyReportObjectBase {
  path = "/reports/country_property";

  get $headerRoot() {
    return browser.react$(`ReportHeader`, {
      props: {
        testId: "countryPropertyFormHeader",
      },
    });
  }
  private get $bodyRoot() {
    return browser.react$(``, { props: { testId: "" } });
  }
  protected get $modalsUniversalRoot() {
    return $(`//div[@class='ui page modals dimmer transition visible active']`);
  }
  protected get $modalUniversalCloseButton() {
    return this.$modalsUniversalRoot.$(`//button[contains(text(),'Закрыть')]`);
  }
}
