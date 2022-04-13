class BaClassicPayHistory {
  path = "/pay_history.html";

  private get $root() {
    return $(`#pay-history`);
  }
  get $button_addMoneyViaInvoice() {
    return this.$root.$(`#show-invoice-btn`);
  }
  private get $block_logPaymentsToExcel() {
    return this.$root.$(`#payments-log-block`);
  }
  get $data_startDate() {
    return this.$block_logPaymentsToExcel.$(`div.from-date`);
  }
  get $data_endDate() {
    return this.$block_logPaymentsToExcel.$(`div.to-date`);
  }
  get $button_logPaymentsToExcel() {
    return this.$block_logPaymentsToExcel.$(`#payments-log-btn`);
  }
  private get $block_accountBalance() {
    return this.$root.$(`#pay-history-bar`);
  }
  get $text_accountBalanceInRubbles() {
    return /\d+/.exec(this.$block_accountBalance.$(`#rubble span.balance-value`).getValue())![0];
  }
  private get $root_paymentsHistoryTable() {
    return this.$root.$(`#payments_wrapper`);
  }
  private get $loader_paymentsHistoryTable() {
    return this.$root.$(`#payments_processing`);
  }
  get $text_paymentsHistoryLastReportUrl() {
    // return this.$root_paymentsHistoryTable.$(`tdoby>tr>td>a`).getAttribute("href");
    return $(`//*[@id="payments"]/tbody/tr/td/a`).getAttribute("href");
  }
  get $() {
    return this.$root.$(``);
  }
  // -------------------------------------------------------------------
  waitForLoad() {
    this.$root.waitForExist();
    this.$button_addMoneyViaInvoice.waitForClickable();
    this.$root_paymentsHistoryTable.waitForExist();
    this.$loader_paymentsHistoryTable.waitForDisplayed({ timeout: 10000, reverse: true });
  }
}
export const baClassicPayHistory = new BaClassicPayHistory();
