import { BaReportsVehicleFuelType } from "./enums/ba.classic.enum.vehicle.fuelType";

class BaAutoReportPage {
  path = "/autoReport.html?id=";

  private get $root() {
    return $(`#auto-report`);
  }
  private get $report_container() {
    return $(`#report-container`);
  }
  private get $input_agreementNum() {
    return this.$report_container.$(`#agreementNumber`);
  }
  private get $input_agreemetDate() {
    return this.$report_container.$(`#agreementDate`);
  }
  private get $input_reportNumber() {
    return this.$report_container.$(`#reportNumber`);
  }
  private get $input_composedDate() {
    return this.$report_container.$(`#composedDate`);
  }
  private get $input_appraisalDate() {
    return this.$report_container.$(`#appraisalDate`);
  }
  get $vehicleData_vinNumber() {
    return this.$report_container.$(`#vin`);
  }
  get $vehicleData_vendor() {
    return this.$report_container.$(`#vendor`);
  }
  get $vehcileData_releaseYear() {
    return this.$report_container.$(`#year`);
  }
  get $checkbox_vehicleData_approve() {
    return this.$report_container.$(`#autoFieldsApproved`);
  }
  private get $input_model() {
    return this.$report_container.$(`#model`);
  }
  private get $selector_fuelType() {
    return this.$report_container.$(`#fuelType`);
  }
  private get $input_enginePower() {
    return this.$report_container.$(`#enginePowerHP`);
  }
  private get $selector_transmissionCode() {
    return this.$report_container.$(`#transmissionCode`);
  }
  private get $checkbox_transmissionAssumption() {
    return this.$report_container.$(`#transmissionAssumption`);
  }
  private get $button_getModification() {
    return this.$report_container.$(`a.btn.modBtn.btn-warning`);
  }
  private get $getModification_response() {
    return this.$report_container.$(`#mod-resp`);
  }
  private get $getModification_modSelector() {
    return this.$report_container.$(`#modificationGroup`).selectByIndex(0);
  }
  private get $checkbox_modificationAssumption() {
    return this.$report_container.$(`#modificationAssumption`);
  }
  private get $selector_owners() {
    return this.$report_container.$(`#owners`);
  }
  private get $selector_accident() {
    return this.$report_container.$(`#accident`);
  }
  private get $checkbox_accidentAssumption() {
    return this.$report_container.$(`#accidentAssumption`);
  }
  private get $selector_tireState() {
    return this.$report_container.$(`#tireState`);
  }
  private get $checkbox_tireStateAssumption() {
    return this.$report_container.$(`#tireStateAssumption`);
  }
  private get $selector_ownerContactType() {
    return this.$report_container.$(`#ownerContact_type`);
  }
  private get $button_ownerContactCommit() {
    return this.$report_container.$(`#ownerContact_typeCommited`);
  }
  private get $button_ownerContactNameCommit() {
    return this.$report_container.$(`#ownerContact_nameCommited`);
  }
  /*  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  }
  private get $() {
    return this.$report_container.$(``);
  } */
  // ---------------------------------------------------------------
  waitForLoad(timeout?: number) {
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
    this.$root
      .$(`div.blockUI.blockMsg.blockPage`)
      .waitForDisplayed({ timeout: timeout ? timeout : 5000, reverse: false });
    this.$input_agreementNum.waitForClickable();
  }
  select_fuelType(fuelType: BaReportsVehicleFuelType) {
    this.$selector_fuelType.selectByAttribute("value", fuelType);
  }
  select_accidents(accidents: boolean) {
    accidents
      ? this.$selector_accident.selectByAttribute("value", "TRUE")
      : this.$selector_accident.selectByAttribute("value", "FALSE");
  }
  select_tireState(tireState: boolean) {
    tireState
      ? this.$selector_accident.selectByAttribute("value", "GOOD")
      : this.$selector_accident.selectByAttribute("value", "BAD");
  }
}
/** Страница отчёта по Авто */
export const baAutoReportPage = new BaAutoReportPage();
