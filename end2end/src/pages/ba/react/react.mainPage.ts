class ReactMainPage {
  path = "/reports/";

  /** Тёмный фон модальных окон */
  private get $modal_backdrop() {
    return browser.$(`div[class*=modal-backdrop]`);
  }
  /** Кнопка `Новый отчёт` в шапке,
   * для создания отчёта любого доступного типа
   */
  get $button_newReportToModal() {
    return $(`//*[contains(text(),"Новый отчет")]`);
  }
  /** Кнопка `Создать отчёт` */
  get $button_CreateNewResidentialReport() {
    return $(`button[class*="Reports_createReport"]`);
  }
  /** модальное окно с выбором типов отчётов для создания */
  get $modal_reportSelection() {
    return browser.$("#selectReportTypeModal");
  }
  get $button_simpleNotificationModalClose() {
    return $(`div.ui.page.modals.visible.active div.ui.modal.visible.active div.actions > button`);
  }
  // -------------------------------------------------------------------------------------------------------
  private closeNotification() {
    if (this.$button_simpleNotificationModalClose.isDisplayed()) {
      this.$button_simpleNotificationModalClose.click();
      return true;
    }
    return false;
  }
  waitForLoad() {
    browser.waitUntil(() => browser.getUrl().match(this.path) != null);
    browser.pause(750);
    while (this.closeNotification());
  }
}
/** Основная страница - "/index.html" */
export const reactMainPage = new ReactMainPage();
