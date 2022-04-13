import options from "options";

class FaOrdersList {
  path = "/fa_valuation_order_list.html";

  private get $table_wrapper() {
    return $(`#fa-valuation-orders-table_wrapper`);
  }
  private get $table_processing() {
    return this.$table_wrapper.$(`#fa-valuation-orders-table_processing`);
  }
  private get $table_content_base() {
    return this.$table_wrapper.$(`#fa-valuation-orders-table`);
  }
  get $table_firstElement() {
    return this.$table_content_base.$(`tbody tr`);
  }
  get $$table_content() {
    return this.$table_content_base.$$(`tbody tr`);
  }
  // -----------------------------------------------------------------------------
  open() {
    browser.url(options.ba.host + this.path);
  }
  waitForLoad() {
    this.$table_processing.waitForDisplayed({ timeout: 20000, reverse: true });
  }
}

export const faOrdersList = new FaOrdersList();
