class KronaReportCard {
  path = "/report";

  /** Таблица "Исходная информация" */
  get $table_reportSourceInfo() {
    return browser.$("#request_source_information_table");
  }
  /** Таблица с аналогами робота */
  get $table_robotValuationComparables() {
    return browser.$("#valuation-comparable-table_wrapper");
  }
  /** Карта с аналогами */
  get $reportCard_yandexMap() {
    return browser.$("#YMapsID");
  }
  /** Кнопка "Скачать заключение" (иконка в виде файла) */
  get $button_downloadConclusion() {
    return browser.$(`a[href*="files/download/request/"]`);
  }
}
/** Карточка объекта из "Реестра Отчётов" */
export const kronaReportCard = new KronaReportCard();
