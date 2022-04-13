import { KronaVehicleBzoStatus } from "./enums";

class KronaVehicleValuationOrdersRegistry {
  path = "/valuation/orders";

  private get $root() {
    return $(`form#input.clearfix`);
  }
  // блок фильтров
  get $filterInput_Region() {
    return this.$root.$("#region");
  }
  /** Оценщик */
  get $filterInput_Appraiser() {
    return this.$root.$("#company");
  }
  /** собственник ТС */
  get $filterInput_Owner() {
    return this.$root.$("#owner");
  }
  /** Фильтр VIN */
  get $filterInput_Vin() {
    return this.$root.$("#vin");
  }
  /** номер отчёта */
  get $filterInput_ReportNumber() {
    return this.$root.$("#reportNumber");
  }
  /** диагностика */
  get $filterSelector_Diagnostic() {
    return this.$root.$("#diagnosticReport");
  }
  /** статус заказа */
  get $filterSelector_Status() {
    return this.$root.$("#status");
  }
  /** повреждения */
  get $filterSelector_CaseDefects() {
    return this.$root.$("#caseDefects");
  }
  /** Цель оценки */
  get $filterSelector_Reason() {
    return this.$root.$("#valuationReason");
  }
  /** внутренний осмотр */
  get $filterSelector_extInspection() {
    return this.$root.$("#externalInspection");
  }
  /** внешний осмотр */
  get $filterSelector_intInspection() {
    return this.$root.$("#internalInspection");
  }
  /** ожидает сканы */
  get $filterSelector_Scans() {
    return this.$root.$("#waitingForScans");
  }
  get $filterDate_dateBegin() {
    return this.$root.$("#dateBegin");
  }
  get $filterDate_dateEnd() {
    return this.$root.$("#dateEnd");
  }
  get $RadioButton_dateSend() {
    return this.$root.$('a[value="CREATED_ON"]');
  }
  get $RadioButton_statusChange() {
    return this.$root.$('a[value="INCOME_DATE"]');
  }
  get $checkbox_currentUserRequests() {
    // чекбокс "только мои отчёты"
    return this.$root.$("#myOwnOnly");
  }
  get $button_showResults() {
    // кнопка "показать"
    return this.$root.$("#valuationOrderListDataTableSubmitButton");
  }
  // ---------------------------------------------------------------------------
  //                                    Функции
  // ---------------------------------------------------------------------------
  /**
   * Функция выбора статуса
   *
   * @param status - enum.KronaVehicleBzoStatus
   */
  select_status(status: KronaVehicleBzoStatus) {
    return this.$filterSelector_Status.selectByAttribute("value", status);
  }
  waitForLoad() {
    this.$root.waitForExist();
    this.$root.waitForDisplayed();
  }
}
/** БЗО. ТС. Реестр оценок */
export const kronaVehicleValuationOrdersRegistry = new KronaVehicleValuationOrdersRegistry();
