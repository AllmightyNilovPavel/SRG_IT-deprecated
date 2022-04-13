class KronaFaPublicOrder {
  path = "/fa/public/order/";

  // ------------------------- Блок сведений о заказе --------------------------
  private get $orderInfo_root() {
    return $(`div.container-fluid > div.col-md-12`);
  }
  // ---------------------------------------------------------------------------
  waitForLoad() {
    this.$orderInfo_root.waitForExist({
      timeout: 50000,
      timeoutMsg: `Реестр на странице ${this.path} не загрузился за 50 сек`,
    });
  }
}

export const kronaFaPublicOrder = new KronaFaPublicOrder();
