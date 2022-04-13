class RefinOrdersCard {
  path = "/fa_valuation_order.html";

  private get $root() {
    return $(`div#report-container`);
  }
  private get $block_faValWrapper_1() {
    return this.$root.$(`div#fa-valuation-wrapper-1`);
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
    this.$block_faValWrapper_1.waitForDisplayed({ timeout: 20000, reverse: false });
  }
}

export const refinOrdersCard = new RefinOrdersCard();
