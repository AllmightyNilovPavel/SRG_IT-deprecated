class SviazUserCabinet {
  path = "/credit/order/";

  private get $button_logout() {
    return $(`a[class*='profileBlockLogoff']`);
  }

  public get $button_newOrder() {
    return $(`button[class*="OrderList_buttonOrder"]`);
  }

  public get $table_block() {
    return browser.$(
      "#BaseLayout_content_3o9WG > div:nth-child(3) > div > div.OrderList_content_1MO0O > div.OrderList_tableBlock_3g8Wl"
    );
  }
  private get $table_ordersContent() {
    return $(`div[class*="OrderList_content"]`);
  }

  waitForLoad() {
    this.$button_logout.waitForClickable({ timeout: 30000 });
    this.$table_ordersContent.waitForDisplayed({});
  }
}

export const sviazUserCabinet = new SviazUserCabinet();
