class KronaVehicleExpressOrderCard {
  /** Таблица результатов оценки   */
  get $table_Result() {
    return browser.$("#valuationResult");
  }
  /** Галочка "Нестандартный VIN"   */
  private get $checkbox_nonStandartVin() {
    return browser.$("#nonstandardVin");
  }
  /** поле ввода VIN */
  get $input_Vin() {
    return browser.$("#vin");
  }
  /** поле ввода Пробега */
  private get $input_Mileage() {
    return browser.$("#mileagePretty");
  }
  /** тип авто */
  private get $selector_vehicleType() {
    return browser.$(`#autoTypeCode`);
  }
  /** производитель авто */
  private get $selector_vehicleVendor() {
    return browser.$("#vendorCode");
  }
  /** месяц выпуска */
  private get $selector_releaseDateMonth() {
    return browser.$(`//*[@id="year"]/../select[1]`);
  }
  /** год выпуска */
  private get $selector_releaseDateYear() {
    return browser.$(`#year`);
  }
  /** Поле "Модель" */
  private get $selector_vehicleModel() {
    return browser.$(`#modelCode`);
  }
  /** Поле "тип кузова" */
  private get $selector_vehicleBody() {
    return browser.$("#caseTypeGroup");
  }
  /** Поле "Двигатель" */
  private get $selector_vehicleEngine() {
    return browser.$("#engineGroup");
  }
  /** Поле "КПП" */
  private get $selector_vehicleTansmission() {
    return browser.$("#transmissionCode");
  }
  /** Поле "Модификация" */
  private get $selector_vehicleModification() {
    return browser.$("#modificationGroup");
  }
  /** Поле "Владельцы" */
  private get $selector_ownersCount() {
    return browser.$("#owners");
  }
  /** Поле "Аварии" */
  private get $selector_Accidents() {
    return browser.$("#accident");
  }
  /** Поле "состояние шин" */
  private get $selector_tireState() {
    return browser.$("#tireState");
  }
  private get $selector_reductionFactor() {
    return $(`#reductionFactor`);
  }
  /** поле "Стоимость объекта" */
  public get $input_price() {
    return browser.$(`#reportPrice`);
  }
  /** кнопка "отправить" */
  public get $button_send() {
    return browser.$(`#sendAutoValuation`);
  }
  // ---------------------------------------------------------------------------
  //                                    Функции
  // ---------------------------------------------------------------------------
  /**   * Функция заполнения данных по авто.
   * Передаёшь тип и форма заполняется.
   *
   * @param vehicle_type
   * Light | Bus | Light_Commercial | Crossover
   */
  // create_new(vehicle_type: string) {
  //   this.$checkbox_nonStandartVin.click();
  //   switch (vehicle_type) {
  //     case "Light": {
  //       this.$input_Vin.setValue(TestDataKrona.Vehicle.VIN);
  //       // selectByValue(this.$selector_vehicleType, TestDataKrona.Vehicle.VehicleType);
  //       // selectByValue(this.$selector_vehicleType, TestDataKrona.Vehicle.VehicleType);
  //       selectByIndex(this.$selector_vehicleVendor, TestDataKrona.Vehicle.Vendor);
  //       selectByValue(this.$selector_releaseDateMonth, TestDataKrona.Vehicle.releaseMonth);
  //       selectByValue(this.$selector_releaseDateYear, TestDataKrona.Vehicle.releaseYear);
  //       selectByValue(this.$selector_vehicleModel, TestDataKrona.Vehicle.Model);
  //       selectByIndex(this.$selector_vehicleBody, TestDataKrona.Vehicle.CaseType);
  //       selectByIndex(this.$selector_vehicleEngine, TestDataKrona.Vehicle.Engine);
  //       selectByIndex(this.$selector_vehicleTansmission, TestDataKrona.Vehicle.Transmission);
  //       selectByIndex(this.$selector_vehicleModification, TestDataKrona.Vehicle.Modification);
  //       this.$input_Mileage.setValue(TestDataKrona.Vehicle.Mileage);
  //       selectByValue(this.$selector_ownersCount, TestDataKrona.Vehicle.OwnersCount);
  //       selectByIndex(this.$selector_Accidents, TestDataKrona.Vehicle.Accident);
  //       selectByValue(this.$selector_tireState, TestDataKrona.Vehicle.TireState);
  //       selectByValue(this.$selector_reductionFactor, TestDataKrona.Vehicle.ReductionFactor);
  //       this.$input_price.scrollIntoView();
  //       this.$input_price.setValue(TestDataKrona.Vehicle.Price);
  //     }
  //   }
  // }
}

function selectByIndex($el: WebdriverIO.Element, val: number) {
  $el.$(`option:nth-child(${val + 1})`).waitForExist({ timeout: 1000 });
  $el.selectByIndex(val);
}

function selectByValue($el: WebdriverIO.Element, val: string) {
  $el.$(`option[value="${val}"]`).waitForExist({ timeout: 1000 });
  $el.selectByAttribute("value", val);
}
/** Карточка заказа "Экспресс ТС" */
export const kronaVehicleExpressOrderCard = new KronaVehicleExpressOrderCard();
