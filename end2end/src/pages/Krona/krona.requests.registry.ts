import { KronaResidentialRequestStatus, KronaRequestObjectType } from "./Enums";

//TODO: почистить описание фильтров и перенести всё в kronaFiltersBox

class KronaRequestsRegistry {
  path = "/requests";

  get $requests_filters() {
    return browser.$(`#filter_box`);
  }

  /** Фильтр "Адрес" */
  get $filter_Address() {
    return this.$requests_filters.$(`#address`);
  }
  /** Фильтр "Банк" */
  get $filter_Bank() {
    return this.$requests_filters.$(`#companyIds_chosen`);
  }
  /** Фильтр "Статус" */
  get $filter_Status() {
    return this.$requests_filters.$(`#status`);
  }
  /** Фильтр "Кадастровый номер" */
  get $filter_cadastralNumber() {
    return this.$requests_filters.$("#cadastralNumber");
  }
  /** Фильтр "Пользователь" */
  get $filter_User() {
    return this.$requests_filters.$("#author");
  }
  /** Фильтр "Тип объекта" */
  get $filter_objectType() {
    return this.$requests_filters.$("#type");
  }
  /** Фильтр "Список Id заявок" */
  get $filter_requestId() {
    return this.$requests_filters.$("#rfvIds");
  }
  /** Фильтр "Список App Id заявок" */
  get $filter_requestAppId() {
    return this.$requests_filters.$("#appReqIds");
  }
  /** Фильтр "Дата от..." */
  get $filter_dataFrom() {
    return this.$requests_filters.$("#dateBegin");
  }
  /** Фильтр "Дата до..." */
  get $filter_dataTo() {
    return this.$requests_filters.$("#dateEnd");
  }
  /** Фильтр "Отклонение от..." */
  get $filter_deviationFrom() {
    return this.$requests_filters.$("#deviationFrom");
  }
  /** Фильтр "Отклонение до..." */
  get $filter_deviationTo() {
    return this.$requests_filters.$("#deviationTo");
  }
  /** Кнопка "Показать" */
  get $button_showResult() {
    return this.$requests_filters.$("#filterReestr");
  }
  /** Кнопка "В эксель" */
  get $button_excelExport() {
    return this.$requests_filters.$("#exportRequestReestr");
  }
  /** Чекбокс "Только мои отчёты" */
  get $checkbox_currentUserRequests() {
    return this.$requests_filters.$("#myOwnOnly");
  }
  // ---------------------------------------------------------------------------
  //                                    Функции
  // ---------------------------------------------------------------------------

  /** Функция выбора значения фильтра по статусу */
  select_status(Status: KronaResidentialRequestStatus) {
    return this.$filter_Status.selectByAttribute("value", Status);
  }
  /** Функция выбора значения фильтра по типу объекта */
  select_objectType(objectType: KronaRequestObjectType) {
    console.log(`В фильтре выбираю тип объекта = ${objectType}`);
    return this.$filter_objectType.selectByAttribute("value", objectType);
  }
  /** Нажатие кнопки "Показать" */
  show() {
    kronaRequestsRegistry.$button_showResult.click();
    console.log(`Клик по кнопке "Показать"`);
  }
}
/** Реестр Объектов */
export const kronaRequestsRegistry = new KronaRequestsRegistry();
