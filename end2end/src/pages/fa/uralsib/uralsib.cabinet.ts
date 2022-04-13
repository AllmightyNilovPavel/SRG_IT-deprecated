export class UralsibUserCabinet {
  path = "/credit/order/";

  /** Таблица реестра заказов */
  public get $table_block() {
    return $(`div[class*="OrderList_tableBlock"]`);
  }

  private get $button_logout() {
    return $(`a[class*='profileBlockLogoff']`);
  }

  waitForLoad() {
    this.$button_logout.waitForClickable({ timeout: 5000 });
  }
}

/** ЛК пользователя Уралсиба */
export const uralsibUserCabinet = new UralsibUserCabinet();
