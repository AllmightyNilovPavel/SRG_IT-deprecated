class FederalAppraiserUserCabinet {
  path = "/order/";

  private get $orderList_root() {
    return $(`div[class^="OrderList_root"]`);
  }
  private get $orderList_loader() {
    return $(`div[class*="OrderList_loader"]`);
  }
  // -------------------------------------------------------------
  waitForLoad() {
    this.$orderList_root.waitForExist({ timeout: 10000, reverse: false });
    this.$orderList_loader.waitForDisplayed({ timeout: 10000, reverse: true });
  }
}

export const faUserCabinet = new FederalAppraiserUserCabinet();
