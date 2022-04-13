/**
 * Класс описывающий страницу работы с аналогами
 */
export class BaResidentialReportPartAnalogs {
  protected get $root() {
    return $(`#tab6`);
  }
  private get $root_comparables() {
    return this.$root.$(`#comparables`);
  }
  protected get $head() {
    return this.$root_comparables.$(`thead`);
  }
  protected get $body() {
    return this.$root_comparables.$(`tbody`);
  }
}
