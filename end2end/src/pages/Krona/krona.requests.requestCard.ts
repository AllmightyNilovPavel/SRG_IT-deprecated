import { options } from ".";

class KronaRequestCard {
  path = "/request/";

  private get $root() {
    return browser.$(`//div[@class='container-fluid card-container-fluid']`);
  }
  /** Карта с аналогами */
  get $requestCard_yandexMap() {
    return browser.$("#YMapsID");
  }
  /** Кнопка "Скачать заключение" (иконка в виде файла) */
  get $button_downloadConclusion() {
    return browser.$(`a[href*="files/download/request/"]`);
  }
  // ---------------------------------------------------------------------------
  /** Таблица "Исходная информация" */
  get $table_requestSourceInfo() {
    return this.$root.$(`//*[@id='request_source_information_table']`);
  }

  // ---------------------------------------------------------------------------
  get $info_requestStatus() {
    return this.$root.$(`//div[contains(text(),'Результат')]/..//h4`);
  }
  // ---------------------------------------------------------------------------
  /** Таблица с аналогами робота */
  get $table_robotValuationComparables() {
    return this.$root.$(`//*[@id='valuation-comparable-table_wrapper']`);
  }
  // ---------------------------------------------------------------------------
  goToRequestCard(rfvId: string) {
    browser.url(options.krona.host + this.path + rfvId);
    this.waitForLoad();
  }

  waitForLoad() {
    this.$root.waitForExist();
    this.$table_requestSourceInfo.waitForDisplayed({
      timeout: 7000,
      timeoutMsg: `Исходная информация по объекту оценки не загрузилась на странице ${browser.getUrl()}`,
    });
    console.log(`Открылась карточка объекта ${browser.getUrl()}`);
  }
}
/** Карточка объекта из "Реестра Объектов" */
export const kronaRequestCard = new KronaRequestCard();
