class KronaSmartRegionPrices {
  path = "/regionsPricesSmart";

  private get $regionsTableWrapper() {
    return $(`#regions_table_wrapper`);
  }
  get $regionsTableWrapper_data() {
    return this.$regionsTableWrapper.$$(`table > tbody > tr`);
  }
  waitForLoad() {
    browser.waitUntil(() => browser.getUrl().match(this.path) != null);
    this.$regionsTableWrapper.waitForExist();
  }
}

export const kronaSmartRegionPrices = new KronaSmartRegionPrices();
