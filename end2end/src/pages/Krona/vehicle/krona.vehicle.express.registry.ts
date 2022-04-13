class KronaVehicleExpressRegistry {
  /** кнопка "Показать" */
  get $button_showResults() {
    return $("#valuationOrderListDataTableSubmitButton");
  }
}
/** ТС. Реестр экспресс оценок */
export const kronaVehicleExpressRegistry = new KronaVehicleExpressRegistry();
