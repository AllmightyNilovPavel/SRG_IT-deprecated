class PsbUserCabinet {
  path = "/credit/order/";

  get $profileLink() {
    return $(`#profileLink`);
  }
  private get $RootOrderList() {
    return $(`div[class^="OrderList_root"]`);
  }
  public get $loader() {
    return this.$RootOrderList.$(`div[class^="OrderList_loader"]`);
  }
  private get $OrderList_table() {
    return this.$RootOrderList.$(`div[class^="OrderList_tableBlock"]`);
  }
  get $OrderList_tableContent() {
    return this.$RootOrderList.$(`div[class^="OrderList_tableBlock"] > table > tbody`);
  }

  
  // public get $table_block() {
  //   return browser.$(
  //     "#BaseLayout_content_3o9WG > div:nth-child(3) > div > div.OrderList_content_1MO0O > div.OrderList_tableBlock_3g8Wl"
  //   );
  // }
  waitForLoad() {
    this.$RootOrderList.waitForExist();
    this.$OrderList_table.waitForDisplayed({});
    this.$loader.waitForDisplayed({ timeout: 30000, reverse: true });
  }
}

export const psbUserCabinet = new PsbUserCabinet();
