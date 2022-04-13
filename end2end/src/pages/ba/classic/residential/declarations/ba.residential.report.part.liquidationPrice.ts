export class BaResidentialReportPartLiquidationPrice {
  protected get $root() {
    return $(`//form[@id='liquidation-form']`);
  }
  protected get $input_riskFreeRate() {
    return this.$root.$(`//*[@id='riskFreeRate']`);
  }
  protected get $button_getRiskFreeRate() {
    return this.$root.$(`//*[@onclick="loadRiskFreeRate()"]`);
  }
}
