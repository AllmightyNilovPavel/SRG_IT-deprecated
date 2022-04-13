export class BaResidentialReportPartAdjustments {
  private get $root() {
    return $(`//form[@id='adjustments']`);
  }
  protected get $input_costRangeFrom() {
    return this.$root.$(`//input[@id='costRangeFrom']`);
  }
  protected get $input_costRangeTo() {
    return this.$root.$(`//input[@id='costRangeTo']`);
  }
}
