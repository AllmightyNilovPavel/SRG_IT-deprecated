class KronaSbdOrders {
  /** таблица с историей работы над заказом */
  get $sbdOrderCard_HistoryTable() {
    return browser.$("body > div.container-fluid > div > div.col-md-5");
  }
  /** Кнопка "Распечатать" */
  get $button_sbdOrderCard_print() {
    return browser.$("#btnPrint");
  }
  /** кнопка "Удалить и перейти в реестр" */
  get $button_sbdOrdersCard_delete() {
    return browser.$("#btnDelete");
  }
  /** кнопка "Принять отчёт" */
  get $button_sbdOrderCard_accept() {
    return browser.$("#btnBANK_READY");
  }
  /** кнопка "Вернуть на доработку" */
  get $button_sbdOrderCard_correction() {
    return browser.$("#btnSRG_CORRECTION");
  }
  // ---------------------------------------------------------------------------
  //                                    Функции
  // ---------------------------------------------------------------------------
}
/** Реестр "Отчеты об оценке (Сбербанк)" */
export const kronaSbdOrders = new KronaSbdOrders();
