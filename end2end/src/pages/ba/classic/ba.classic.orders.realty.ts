import options from "options";

class RealtyOrdersList {
  path = "/realty_valuation_order_list.html";

  private get $table_wrapper() {
    return $(`//div[@id='realty-valuation-orders-table_wrapper']`);
  }
  private get $table_processing() {
    return this.$table_wrapper.$(`.//div[@id='realty-valuation-orders-table_processing']`);
  }
  private get $table_content_base() {
    return this.$table_wrapper.$(`.//table[@id='realty-valuation-orders-table']`);
  }
  get $table_firstElement() {
    return this.$table_content_base.$(`.//tr//td[4][not(contains(text(),'Удалён'))]/..`);
  }
  get $$table_content() {
    return this.$table_content_base.$$(`tbody tr`);
  }
  // -----------------------------------------------------------------------------
  open() {
    browser.url(options.ba.host + this.path);
  }
  /**
   * Функция ожидания загрузки данных в реестре
   */
  waitForLoad() {
    this.$table_wrapper.waitForExist();
    this.$table_content_base.waitForExist();
    this.$table_content_base.waitForDisplayed();
    this.$table_firstElement.waitForDisplayed();
    /*  this.$table_processing.waitForDisplayed({
      timeout: 20000,
      reverse: true,
      timeoutMsg: `Таблица с данными реестра ЗАКАЗОВ ПО НЕДВИЖИМОСТИ  ${browser.getUrl()} - не загрузилась по истечение 20000ms.`}
    ); */
  }
}

export const realtyOrdersList = new RealtyOrdersList();
