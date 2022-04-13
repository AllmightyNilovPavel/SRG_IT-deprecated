export class BaikalMap {
  path = "/baikal/map";

  // --------------------------------- Фильтр ---------------------------------------------
  private get $filter_root() {
    return $(`div[class^="Filter_root"]`);
  }
  // ---------------------------- Таблица избранного --------------------------------------
  /** База таблицы избранного */
  private get $favorites_root() {
    return $(`div[class^="Favorite_root"]`);
  }
  /** Шапка таблицы избранного */
  private get $favorites_title() {
    return this.$favorites_root.$(`div[class^="Favorite_title"]`);
  }
  /** Кнопка "Редактировать данные объектов избранного" */
  get $button_modifyFavoritesData() {
    return this.$favorites_title.$(`a[title="Редактировать"]`);
  }
  /** Кнопка "Отрыть расчётник" */
  get $button_openCalculation() {
    return this.$favorites_title.$(`a[title="Расчетник"]`);
  }
  /** Кнопка "Экспорт аналогов в xls" */
  get $button_excelExport() {
    return this.$favorites_title.$(`a[title="Экспорт аналогов в xls"]`);
  }
  /** Содержимое таблицы избранного */
  private get $favorites_content() {
    return this.$favorites_root.$(`div[class^="Favorite_content"]`);
  }

  // ---------------------------------- Карта ---------------------------------------------
  private get $map_root() {
    return $(`#root[class^="YMap_root"]`);
  }
  get $map_clutser() {
    return browser.$(`//*[@id="root"]/div/div[2]/div/div[4]/ymaps/ymaps/ymaps/ymaps[5]/ymaps[10]`);
  }
  get $map_popover() {
    return browser.$(`#popover-basic`);
  }
  /** Строка поиска адреса */
  get $map_addressInput() {
    return browser.$(`ymaps[class*=controls__toolbar] input[class*=searchbox-input__input]`);
  }
  /** Кнопка "Найти в строке поиска адреса" */
  get $map_addressFind() {
    return browser.$(`ymaps[class*="searchbox__button"]`);
  }
  /** Карточка объекта */
  get $popover_objectCard() {
    return browser.$(`//*[@id="popover-basic"]/div[2]/div/div[2]/table/tbody/tr[3]/td[1]/a`);
  }
  /** Кнопка + у объекта на карте */
  get $popover_addToCalc() {
    return browser.react$(
      `//*[@id="popover-basic"]/div[2]/div/div[2]/table/tbody/tr[1]/td[6]/div/span[2]`
    );
  }
  /** Кнопка "Объекты списком" */
  get $button_showObjectsInTable() {
    return browser.$(`div[class*="Filter_root"] > div[class*="Filter_title"] button`);
  }
  /** Кнопка "Закрыть" у списка объектов */
  get $button_objectsListClose() {
    return this.$table_objectsList.$(`span[title="Закрыть"]`);
  }
  /** Список объектов на карте в виде таблицы */
  get $table_objectsList() {
    return browser.$(`div[class*="CoreLayout_content"] > div > div[class*="OffersList_root"]`);
  }
  /** Массив кнопок +  из таблицы объектов */
  get $button_addObjectFromObjectsList() {
    return this.$table_objectsList.$$(`.glyphicon-plus`);
    // return this.$table_objectsList.$$(`span[title="Добавить в расчет"]`);
  }
  get $loader_objectList() {
    return this.$table_objectsList.$(`[class*="Spinner_root"]`);
  }
  get $button_objectsListEditOffer() {
    return this.$table_objectsList.$(`a[href*="offer-edit"]`);
  }
  /** Кнопка звёздочки у объекта на карте */
  get $popover_addToFav() {
    return browser.$(
      `//*[@id="popover-basic"]/div[2]/div/div[2]/table/tbody/tr[1]/td[6]/div/span[1]`
    );
  }
  /** Кнопка beta */
  get $button_beta() {
    return this.$header.$(`//div[contains(@title, "Перейти на бету")]`);
  }

  get $header() {
    return browser.$(`//div[contains(@class, 'Header_root')]`);
  }

  // ------------------------------------------------ Методы --------------------------------------------------------

  openBeta() {
    console.log(`Ждем полявления кнопки для перехода в Байкал-beta`);
    this.$button_beta.waitForClickable({
      timeoutMsg: `Кнопка для перехода в Байкал-beta не кликабельна`,
    });
    console.log(`Клик по кнопке "beta"`);
    this.$button_beta.click();
    console.log(`Перехожу в Байкал-beta`);
  }

  // --------------------------------------------------------------------------------------

  waitForLoad() {
    browser.waitUntil(() => browser.getUrl().match(this.path) != null);
  }
}

/** Слой карты Байкала */
export const baikalMap = new BaikalMap();
