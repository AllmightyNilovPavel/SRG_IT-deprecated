class FaOrderCard {
  path = `/fa_valuation_order.html`;

  private get $root() {
    return $(`div#report-container`);
  }
  private get $block_faValWrapper_1() {
    return this.$root.$(`div#fa-valuation-wrapper-1`);
  }
  get $data_orderInfo() {
    return this.$block_faValWrapper_1.$(`fieldset`);
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

  // -----------------------------------------------------------------------------
  waitForLoad() {
    this.$block_faValWrapper_1.waitForDisplayed({ timeout: 20000, reverse: false });
  }
}

export const faOrderCard = new FaOrderCard();
