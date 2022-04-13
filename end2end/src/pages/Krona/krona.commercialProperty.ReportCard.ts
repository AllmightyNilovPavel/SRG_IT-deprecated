class KronaCommercialPropertyReportCard {
  path = "/commercial/report";

  /** Информационный блок по объекту */
  get $commercialPropRep_summary() {
    return $("#requisites");
  }
  waitForLoad() {
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
    this.$commercialPropRep_summary.waitForExist();
    this.$commercialPropRep_summary.waitForDisplayed();
  }
}

/** Карточка объекта "Коммерческая недвижимость" */
export const kronaCommercialPropertyReportCard = new KronaCommercialPropertyReportCard();
