// Реестр "Аккредитации"

class KronaAccreditationsRegistry {
  path = "/accreditation/companies";

  /** Фильтр "Наименование" */
  get $filter_Name() {
    return $("#name");
  }
  /** Фильтр "Инн" */
  get $filter_Inn() {
    return $("#inn");
  }
  /** Фильтр "Регионы" */
  get $filter_Regions() {
    return $("#regions_chosen");
  }
  /** Фильтр "Банк" */
  get $filter_Banks() {
    return $("#companyIds_chosen");
  }
  /** Фильтр "Тип аккредитации" */
  get $filter_AccType() {
    return $("#accreditationTypes_chosen");
  }
  /** Кнопка "Добавить" */
  get $button_NewAcc() {
    return $(`a[href="/9r/accreditation/new"]`);
  }
  /** Чекбокс "Красная зона" */
  get $checkbox_RedZone() {
    return $("#redZone");
  }
  /** Кнопка "Отфильтровать" */
  public get $button_filter() {
    return $(`#filterAccreditationCompaniesListButton`);
  }
  /** Кнопка "В эксель" */
  public get $button_toExcel() {
    return $(`#exportAccreditationCompanyReport`);
  }
}

/** Реестр аккредитаций */
export const kronaAccreditationsRegistry = new KronaAccreditationsRegistry();
