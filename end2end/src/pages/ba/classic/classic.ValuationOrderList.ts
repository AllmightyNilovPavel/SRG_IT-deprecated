import options from "options";
import { baAutoReportPage } from "./ba.classic.AutoReportPage";

class ValuationOrderList {
  path = "/valuation_order_list.html";

  private get $table_autoOrdersWrapper() {
    return $(`//*[@id="auto-orders-table_wrapper"]`);
  }
  private get $table_Processing() {
    return this.$table_autoOrdersWrapper.$(`//*[@id="auto-orders-table_processing"]`);
  }
  private get $table_Content() {
    return this.$table_autoOrdersWrapper.$(`//*[@id="auto-orders-table"]`);
  }
  get $$table_OrderButtons() {
    return this.$table_Content.$$(`a.btn-success`);
  }

  waitForLoad() {
    this.$table_Processing.waitForDisplayed({ timeout: 5000, reverse: true });
  }
  open() {
    browser.url(options.ba.host + this.path);
    this.waitForLoad;
  }
  orderAccept(orderId: string) {
    let tableRow = this.$table_Content.$(`//td[contains(text(),'${orderId}')]/..`);
    console.log("Строка с номером нашего заказа: ", tableRow);

    tableRow.$(`a.btn-success`).click();
    baAutoReportPage.waitForLoad();
  }
}
/** Реестр заказов по Авто */
export const valuationOrderList = new ValuationOrderList();
