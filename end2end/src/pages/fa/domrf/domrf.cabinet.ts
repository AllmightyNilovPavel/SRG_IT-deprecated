class DomrfUserCabinet {
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
  // public get $table_block() {
  //   return browser.$(
  //     "#BaseLayout_content_3o9WG > div:nth-child(3) > div > div.OrderList_content_1MO0O > div.OrderList_tableBlock_3g8Wl"
  //   );
  // }
  waitForLoad() {
    this.$root_OrderList.waitForExist();
    this.$OrderList_table.waitForDisplayed({});
    this.$loader.waitForDisplayed({ timeout: 30000, reverse: true });
  }
}

/** ЛК пользователя ДомРФ */
export const domrfUserCabinet = new DomrfUserCabinet();
