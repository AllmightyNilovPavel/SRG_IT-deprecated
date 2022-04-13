import options from "options";
import { BaOrdersVehicleStatus } from "./enums";

class VehicleOrdersList {
  path = "/valuation_order_list.html";

  private get $table_wrapper() {
    return $(`#auto-orders-table_wrapper`);
  }
  private get $table_processing() {
    return this.$table_wrapper.$(`#auto-orders-table_processing`);
  }
  private get $table_content_base() {
    return this.$table_wrapper.$(`#auto-orders-table`);
  }
  get $table_firstElement() {
    return this.$table_content_base.$(`tbody tr`);
  }
  get $$table_content() {
    return this.$table_content_base.$$(`tbody tr`);
  }
  /** Кнопка "Взять в работу" */
  get $button_takeOrder() {
    return this.$table_content_base.$(`a[onclick^='takeOrder']`);
  }
  get $button_openOrderReport() {
    return this.$table_content_base.$(`a:contains('Открыть отчёт')`);
  }
  // -----------------------------------------------------------------------------
  private get $block_statusFilter_root() {
    return $(`#count-orders-bar`);
  }
  // -----------------------------------------------------------------------------
  open() {
    browser.url(options.ba.host + this.path);
  }
  waitForLoad() {
    this.$table_processing.waitForDisplayed({ timeout: 20000, reverse: true });
  }
  filterOrdersByStatus(orderStatus: BaOrdersVehicleStatus) {
    if (browser.getUrl().match(this.path) !== null) {
      let target = this.$block_statusFilter_root.$(`#${orderStatus}`);

      target.scrollIntoView({ block: "center", inline: "center" });
      target.click();

      browser.waitUntil(() => target.getAttribute("class") === "active");
    }
  }
}

export const vehicleOrdersList = new VehicleOrdersList();
