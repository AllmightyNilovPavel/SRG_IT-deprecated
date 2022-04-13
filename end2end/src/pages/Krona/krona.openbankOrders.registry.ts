class KronaOpenbankOrdersRegistry {
  path = "/openbank/orders";

  waitForLoad() {
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
  }
}
/** Отчёты об Оценке (ВТБ) */
export const kronaOpenbankOrdersRegistry = new KronaOpenbankOrdersRegistry();
