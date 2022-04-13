class FaPartnerUserCabinet {
  path = "/credit/order/";

  get $profileLink() {
    return $(`#profileLink`);
  }
  private get $root_OrderList() {
    return $(`div[class^="OrderList_root"]`);
  }
  public get $loader() {
    return this.$root_OrderList.$(`div[class^="OrderList_loader"]`);
  }
  private get $OrderList_table() {
    return this.$root_OrderList.$(`div[class^="OrderList_tableBlock"]`);
  }
  get $OrderList_tableContent() {
    return this.$root_OrderList.$(`div[class^="OrderList_tableBlock"] > table > tbody`);
  }

  waitForLoad() {
    try {
      this.$root_OrderList.waitForExist();
      this.$OrderList_table.waitForDisplayed({});
      this.$loader.waitForDisplayed({ timeout: 30000, reverse: true });
    } catch (e) {
      throw new Error(`Партнёрский кабинет не загрузился. ${browser.getUrl()}`);
    }
  }
}

export const partnerUserCabinet = new FaPartnerUserCabinet();
