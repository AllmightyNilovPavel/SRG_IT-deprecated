import { BaResidentialReportPartAssesmentTask } from "./ba.residential.report.part.assesmentTask";

export class BaResidentialReportPartAssesmentTaskVtb extends BaResidentialReportPartAssesmentTask {
  /** Цена услуг по договору (Только ВТБ) */
  get $input_appraisalServicePrice() {
    return this.$root.$(`#appraisalServicePrice`);
  }
  /** выпадающий список "предполагаемое исп. рез-ов" для ВТБ */
  get $selector_intendedUseVTB() {
    return this.$root.$("#intendedUseVTB");
  }
  /** Департамент
   * `#division`
   */
  get $selector_division() {
    return $(`#division`);
  }
}
