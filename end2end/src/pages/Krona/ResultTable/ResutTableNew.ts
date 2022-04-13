import { KronaDataType } from "../Enums";

class KronaResultTableNew {
  private get $tableRoot() {
    return $(`div[class^="PrimeTable_root"]`);
  }
  private get $tableWrapper() {
    return this.$tableRoot.$(`div[class*="tableWrapper"]`);
  }
  private get $tableNavigation() {
    return this.$tableRoot.$(`div[class^="PrimeTable_tableHeader"]`);
  }
  private get $pagination() {
    return this.$tableNavigation.$(`div.ui.mini.pagination.menu`);
  }

  // -------------------------
  private get $tableBody() {
    return this.$tableWrapper.$(`tbody.p-datatable-tbody`);
  }
  private get $tableHead() {
    return this.$tableWrapper.$(`thead.p-datatable-thead`);
  }

  // ---------------------------------------------------------------------
  goToTablePage(pageIndex: number) {
    let destinationPage = this.$pagination.$(`a[value="${pageIndex}"]`);

    destinationPage.waitForClickable();
    destinationPage.click();
  }
  /** * Фунцкия возврата ссылки на элемент таблицы данных
   *
   * @param option - enum.DataType
   */
  resultTableGetData(dataType: KronaDataType) {
    return this.$tableBody.$(dataType);
  }

  waitForLoad(customTimeout?: number) {
    let tempTimeout: number = customTimeout ? customTimeout : 50000;
    this.$tableRoot.waitForExist({
      timeout: tempTimeout,
      timeoutMsg: `Базовый элемент таблицы на странице ${browser.getUrl()} не загрузился за ${tempTimeout} сек`,
    });
    this.$tableBody.waitForDisplayed({
      timeout: tempTimeout,
      timeoutMsg: `Тело таблицы на странице ${browser.getUrl()} не загрузился за ${tempTimeout} сек`,
    });
    this.$pagination.waitForDisplayed({
      timeout: tempTimeout,
      timeoutMsg: `Пагинатор таблицы на странице ${browser.getUrl()} не отрисовался за ${tempTimeout} сек`,
    });
  }
}

export const kronaResultTableNew = new KronaResultTableNew();
