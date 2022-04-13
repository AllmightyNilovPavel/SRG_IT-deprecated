class KronaCommercialRealtyReportsRegistry {
  path = "/commercial/reports";

  waitForLoad() {
    try {
      browser.waitUntil(() => browser.getUrl().match(this.path) !== null) &&
        $(`//h3[contains(text(),'Реестр отчётов - Коммерческая недвижимость')]`).isDisplayed();
    } catch (e) {
      throw new Error(`Ошибка загрузки реестра ${browser.getUrl()}.
        ${e}`);
    }
  }
}

/**
 *
 */
export const kronaCommercialRealtyReportsRegistry = new KronaCommercialRealtyReportsRegistry();
