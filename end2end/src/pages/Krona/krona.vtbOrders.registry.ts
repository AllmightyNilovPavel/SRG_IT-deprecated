class KronaVtbOrdersRegistry {
  path = "/vtb/orders";

  waitForLoad() {
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
  }
}
/** Отчёты об Оценке (ВТБ) */
export const kronaVtbOrdersRegistry = new KronaVtbOrdersRegistry();
