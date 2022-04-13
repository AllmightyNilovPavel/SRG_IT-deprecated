class BaDpaValuationOrdersCard {
  path = "/dpa_valuation_order.html";

  private get $root() {
    return $(`#dpa-valuation-order-wrapper`);
  }
  private get $block_dpaValWrapper_1() {
    return this.$root.$(`div#dpa-valuation-wrapper-1`);
  }
  // get $() {
  //   return this.$root.$(``);
  // }
  // get $() {
  //   return this.$root.$(``);
  // }
  // get $() {
  //   return this.$root.$(``);
  // }
  // get $() {
  //   return this.$root.$(``);
  // }

  // -----------------------------------------------------------------------------
  waitForLoad() {
    this.$block_dpaValWrapper_1.waitForDisplayed({ timeout: 20000, reverse: false });
  }
}

export const baDpaValuationOrdersCard = new BaDpaValuationOrdersCard();
