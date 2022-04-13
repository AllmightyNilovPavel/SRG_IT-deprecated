class KronaFaOrder {
  path = "/fa/order/";

  // ------------------------- Блок сведений о заказе --------------------------
  private get $orderInfo_root() {
    return $(`div.container-fluid > div.col-md-7`);
  }
  // ------------------------------ Блок сообщений ------------------------------
  private get $orderMessages_root() {
    return $(`div.container-fluid > #messagesContainer`);
  }
  get $button_addNewComment() {
    return this.$orderMessages_root.$(`button#sendNewComment`);
  }
  // ---------------------------------------------------------------------------
  waitForLoad() {
    this.$orderInfo_root.waitForExist();
    this.$orderMessages_root.waitForExist();
    this.$button_addNewComment.waitForClickable({ timeout: 10000 });
  }
}

export const kronaFaOrder = new KronaFaOrder();
