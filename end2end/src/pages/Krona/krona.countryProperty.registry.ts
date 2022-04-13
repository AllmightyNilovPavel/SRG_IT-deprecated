import { CountryPropertyStatus } from "./Enums";

class KronaCountryPropertyRegistry {
  path = "/country_property/reports";

  /** фильтр "Дата от..." */
  get $filter_dataFrom() {
    return browser.$("#dateBegin");
  }
  /** фильтр "Дата до..." */
  get $filter_dataTo() {
    return browser.$("#dateEnd");
  }
  /** Фильтр "№ Отчёта" */
  get $filter_reportNumber() {
    return browser.$("#reportNumber");
  }
  /** фильтр "Статус" */
  get $filter_Status() {
    return browser.$("#status");
  }
  /** фильтр "Субъект РФ" */
  get $filter_Region() {
    return browser.$("#region");
  }
  /** фильтр "Заёмщик" */
  get $filter_Customer() {
    return browser.$("#customer");
  }
  /** фильтр "Кредитный Инспектор \ Кредитный аналитик" */
  get $filter_KiKa() {
    return browser.$("#author");
  }
  /** фильтр "Город" */
  get $filter_City() {
    return browser.$("#city");
  }
  /** фильтр "Оценщик" */
  get $filter_appraiser() {
    return browser.$("#appraiser");
  }
  /** фильтр "Верификатор" */
  get $filter_Verificator() {
    return browser.$("#verificator");
  }
  /** чекбокс "Только мои отчёты" */
  get $checkbox_currentUserReports() {
    return browser.$("#myOwnOnly");
  }
  /** кнопка "показать" */
  public get $button_showResult() {
    return browser.$(`#reportListDataTableSubmitButton`);
  }
  // ---------------------------------------------------------------------------
  //                                    Функции
  // ---------------------------------------------------------------------------
  /**
   * Функция выбора фильтра по статусу
   *
   * @param status - enum.CountryPropertyStatus
   */
  select_status(status: CountryPropertyStatus) {
    return this.$filter_Status.selectByAttribute("value", status);
  }
}
/**
 * Реестр отчётов по Жилым Домам
 */
export const kronaCountryPropertyRegistry = new KronaCountryPropertyRegistry();
