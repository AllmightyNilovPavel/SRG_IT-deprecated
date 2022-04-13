class RealtyOrderCard {
  path = "/realty_valuation_order.html";

  private get $root() {
    return $(`div#realty-valuation-order-wrapper`);
  }
  private get $block_realtyValWrapper_1() {
    return this.$root.$(`div#realty-valuation-wrapper-1`);
  }
  get $data_orderInfo() {
    return this.$block_realtyValWrapper_1.$(`fieldset`);
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
    this.$block_realtyValWrapper_1.waitForDisplayed({ timeout: 20000, reverse: false });
  }
}

export const realtyOrderCard = new RealtyOrderCard();
