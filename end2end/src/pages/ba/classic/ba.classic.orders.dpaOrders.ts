import options from "options";

class BaDpaOrdersList {
  path = "/dpa_valuation_order_list.html";

  private get $table_wrapper() {
    return $(`#dpa-valuation-orders-table_wrapper`);
  }
  private get $table_processing() {
    return this.$table_wrapper.$(`#dpa-valuation-orders-table_processing`);
  }
  private get $table_content_base() {
    return this.$table_wrapper.$(`#dpa-valuation-orders-table`);
  }
  get $table_firstElement() {
    return this.$table_content_base.$(`tbody tr`);
  }
  get $$table_content() {
    return this.$table_content_base.$$(`tbody tr`);
  }
  private get $modal_acceptOrder() {
    return $(`div.modal-footer > a.btn-primary[data-handler="1"]`);
  }
  private get $modal_acceptOrderSuccess() {
    return $(`div.modal-footer > a.btn-primary[data-handler="0"]`);
  }
  // -----------------------------------------------------------------------------
  open() {
    browser.url(options.ba.host + this.path);
  }
  waitForLoad() {
    this.$table_processing.waitForDisplayed({ timeout: 20000, reverse: true });
  }
  acceptOrder(orderNumber: string, bank: string) {
    let button = $(`a.btn-small[onclick='acceptOrder("${orderNumber}","${bank}")']`);

    try {
      button.waitForExist();
      button.scrollIntoView();
      button.waitForClickable();
      button.click();
    } catch (e) {
      throw new Error(`Ошибка при принятии заказа. ${e}`);
    }

    this.$modal_acceptOrder.waitForDisplayed({
      timeout: 30000,
      timeoutMsg: `Модальное окно подтверждения принятия заказа не появилось`,
    });
    this.$modal_acceptOrder.click();
    this.$modal_acceptOrder.waitForDisplayed({ timeout: 30000, reverse: true });
    this.$modal_acceptOrderSuccess.waitForClickable({
      timeout: 50000,
      timeoutMsg: `Заказ принят успешно но перехода в отчёт не произошло.
      Потому что инфо окно "Заказ принят" не появилось.`,
    });
    this.$modal_acceptOrderSuccess.click();
    this.$modal_acceptOrderSuccess.waitForDisplayed({
      timeout: 50000,
      reverse: true,
      timeoutMsg: `Заказ принят успешно но перехода в отчёт не произошло.
        Потому что инфо окно "Заказ принят" не исчезло после подтверждения.`,
    });
  }
  returnOrderForCorrection(orderNumber: string) {
    let button = $(`a.btn-small[onclick="requestCorrectionOrder(${orderNumber})"]`);
    button.scrollIntoView();
    button.waitForDisplayed({});
    button.click();
  }
}

export const baDpaOrdersList = new BaDpaOrdersList();
