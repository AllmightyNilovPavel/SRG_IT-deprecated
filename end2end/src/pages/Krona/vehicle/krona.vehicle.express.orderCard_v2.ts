import {
  KronaVehicleTransmissionTypes,
  KronaVehicleOwners,
  KronaVehicleIncidents,
  KronaVehicleReductionFactor,
  KronaVehicleTireState,
  KronaVehicleFuelType,
} from "../Enums";

class KronaVehicleExpressOrderCard_v2 {
  private get $root() {
    return $(`form#autoForm`);
  }
  /** Таблица результатов оценки   */
  get $table_Result() {
    return $("#valuationResult");
  }
  /** Регион оценки */
  private get $selector_reportRegion() {
    return this.$root.$(`#reportRegion`);
  }
  /** Галочка "Нестандартный VIN"   */
  get $checkbox_nonStdVin() {
    return this.$root.$("#nonstandardVin");
  }
  /** поле ввода VIN */
  get $input_Vin() {
    return this.$root.$("#vin");
  }
  /** поле ввода Пробега */
  get $input_Mileage() {
    return this.$root.$("#mileage");
  }
  get $selector_vendor() {
    return $(`//*[@id="vendor_chosen"]/a`);
  }
  get $dropdown_vendorList() {
    return $(`#div_vendor ul.chosen-results`);
  }
  get $vendorList_results() {
    return this.$dropdown_vendorList.$$(`li.active-result`);
  }
  get $input_releaseDate() {
    return this.$root.$(`#releaseDate`);
  }
  get $selector_model() {
    return this.$root.$(`//*[@id="model_chosen"]/a`);
  }
  get $dropdown_modelList() {
    return this.$root.$(`#div_model ul.chosen-results`);
  }
  get $modelList_results() {
    return this.$dropdown_modelList.$$(`li.active-result`);
  }
  /** Поле "КПП" */
  private get $selector_vehicleTransmission() {
    return this.$root.$("#transmission");
  }
  get $selector_engineFuel() {
    return this.$root.$(`#engineFuel`);
  }
  get $input_enginePower() {
    return this.$root.$(`#enginePower`);
  }
  get $button_getModifications() {
    return this.$root.$(`#getModifications`);
  }
  get $selector_modification() {
    return this.$root.$(`#modification`);
  }
  /** Поле "Владельцы" */
  get $selector_ownersCount() {
    return this.$root.$("#owners");
  }
  /** Поле "Аварии" */
  get $selector_Accidents() {
    return this.$root.$("#accident");
  }
  /** Поле "состояние шин" */
  get $selector_tireState() {
    return this.$root.$("#tireState");
  }
  get $selector_reductionFactor() {
    return this.$root.$(`#reductionFactor`);
  }
  /** поле "Стоимость объекта" */
  get $input_price() {
    return this.$root.$(`#reportPrice`);
  }
  /** кнопка "отправить" */
  public get $button_send() {
    return this.$root.$(`#sendAutoValuation`);
  }
  // ---------------------------------------------------------------------------
  //                                    Функции
  // ---------------------------------------------------------------------------
  setReleaseDate(month: string, year: string) {
    let releaseDate = month + "." + year;
    this.$input_releaseDate.setValue(releaseDate);
  }
  /**
   * Функция выбора региона в котором производится оценка.
   *
   * @param reportRegion - код региона из Енама
   */
  selectRegion(reportRegion) {
    this.$selector_reportRegion.selectByAttribute("value", reportRegion);
  }
  selectFuel(fuelType: KronaVehicleFuelType) {
    this.$selector_engineFuel.selectByAttribute("value", fuelType);
  }
  select_transmission(transmissionType: KronaVehicleTransmissionTypes) {
    this.$selector_vehicleTransmission.selectByAttribute("value", transmissionType);
  }
  select_owners(ownersCount: KronaVehicleOwners) {
    this.$selector_ownersCount.selectByAttribute("value", ownersCount);
  }
  select_incidents(incidents: KronaVehicleIncidents) {
    this.$selector_Accidents.selectByAttribute("value", incidents);
  }
  select_tireState(tireState: KronaVehicleTireState) {
    this.$selector_tireState.selectByAttribute("value", tireState);
  }
  select_reductionFactor(reductionFactor: KronaVehicleReductionFactor) {
    this.$selector_reductionFactor.selectByAttribute("value", reductionFactor);
  }
  setVehicleVendor(vendorName: string) {
    this.$selector_vendor.scrollIntoView();
    this.$selector_vendor.waitForDisplayed({});
    this.$selector_vendor.click();
    this.$dropdown_vendorList.waitForDisplayed({});
    this.$root.keys(vendorName);
    this.$vendorList_results[0].waitForDisplayed({ timeout: 2000, reverse: false });
    this.$vendorList_results[0].click();
  }
  setVehicleModel(modelName: string) {
    let modelOption: WebdriverIO.Element;

    this.$selector_model.scrollIntoView();
    this.$selector_model.waitForDisplayed({});
    this.$selector_model.click();
    this.$root.keys(modelName);
    this.$dropdown_modelList.waitForDisplayed({});
    this.$modelList_results[0].waitForDisplayed({ timeout: 2000, reverse: false });

    modelOption = $(`//ul[@class='chosen-results']/li[.='${modelName}']`);
    modelOption.waitForClickable();
    modelOption.click();
    // this.$dropdown_modelList.$(`//*[contains(text(),'${modelName}')]`)
    // $(`li[data-option-array-index='1820']`).click();
    // $(`//*[text() = "${modelName}"]`).click();
  }
  setVehiclePrice(price: string) {
    this.$input_price.scrollIntoView();
    this.$input_price.waitForClickable();
    this.$input_price.setValue(price);
  }
}

/** Карточка заказа "Экспресс ТС" */
export const kronaVehicleExpressOrderCard_v2 = new KronaVehicleExpressOrderCard_v2();
