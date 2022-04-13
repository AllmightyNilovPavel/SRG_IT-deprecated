class AijkOrders {
  private get $root() {
    return $(`//form[@id='aijkOrderForm']`);
  }
  /** таблица с историей работы над заказом */
  get $aijkOrderCard_HistoryTable() {
    return browser.$("body > div.container-fluid > div > div.col-md-5");
  }
  get $input_orderNumber() {
    return this.$root.$(`//input[@id='orderNumber']`);
  }
  /** Кнопка "Распечатать" */
  get $button_AijkOrderCard_print() {
    return this.$root.$(`//button[@id="btnPrint"]`);
  }
  /** кнопка "Удалить и перейти в реестр" */
  get $button_AijkOrdersCard_delete() {
    return browser.$("#btnDelete");
  }
  // ------------------------------------------------------------------------------------------
  //                                      Функции
  // ------------------------------------------------------------------------------------------
}
/** Реестр "Заказы АИЖК" */
export const aijkOrders = new AijkOrders();
