import options from "../../../options";
import { BaResidentialNewReportTypes } from "./enums";

export class BaMainPage {
  path = "/";

  get $text_accountMoney() {
    return $(`//*[contains(@class,'balance-value')]`).getText();
  }
  /** кнопка выхода */
  get $button_logout() {
    return $(`.page-header a[href*=logout]`);
  }
  get $button_switchToReact() {
    return $(`a#turn_on_site_new_version`);
  }
  /** окно загрузки */
  get $overlay_loading() {
    return browser.$(".blockUI.blockOverlay");
  }
  /** Кнопка "закрыть" окна уведомления о ГОСТ */
  private get $button_gost_close() {
    return $("#gost-popup-modal .modal-header button");
  }
  /** Тёмный фон модальных окон */
  private get $modal_backdrop() {
    return browser.$(`div[class*=modal-backdrop]`);
  }
  /** Кнопка "Пополнить счёт" */
  get $buttonCompanyAccountAddMoney() {
    return $(`//a[contains(@class,'refill-account')]`);
  }
  /** меню создания новых отчётов */
  get $button_newReportToModal() {
    return browser.$(".page-header a[onclick^=showCreateReportDialog]");
  }
  /** модальное окно с выбором типов отчётов для создания */
  get $modal_reportSelection() {
    return $("#selectReportTypeModal");
  }
  /** кнопка создания нового отчёта по квартире */
  get $button_CreateNewReport() {
    return this.$modal_reportSelection.$(".modal-body a[onclick^=createNewReport]");
  }
  /** новый отчёт по КН */
  get $button_CreateNewCommReport() {
    return this.$modal_reportSelection.$(".modal-body a[onclick^=createNewCommReport]");
  }
  /** новый отчёт по загородке */
  get $button_CreateNewCountrysideReport() {
    return this.$modal_reportSelection.$(".modal-body a[onclick^=createNewCountrysideReport");
  }
  /** кнопка "зарегистрироваться" */
  get $button_register() {
    return browser.$("body > div.header > div > div.header-rigth-box > ul > li:nth-child(3) > a");
  }
  get $modal_notification() {
    return browser.$(".notificationModal");
  }
  get $button_notificationModalApprove() {
    return browser.$(".notificationModal .notificationModal_content_approve_button");
  }
  get $checkbox_notificationModal() {
    return browser.$(".notificationModal input[type=checkbox]");
  }
  get $modal_simpleNotificationModal() {
    return browser.$(`#index > div.simpleNotificationModal > div.simpleNotificationModal_content`);
  }
  get $button_simpleNotificationModalClose() {
    return this.$modal_simpleNotificationModal.$(`.simpleNotificationModal_content_approve_button`);
  }
  // -------------------------------------------------------------------------------------------------------
  open() {
    browser.url(options.ba.host + this.path);
    if (browser.isAlertOpen()) browser.acceptAlert();
    this.waitForLoad();
    while (this.gostClose());
    while (this.closeNotification());
    while (this.closeNotification());
  }
  private closeNotification() {
    if (this.$modal_notification.isDisplayed()) {
      this.$checkbox_notificationModal.click();
      this.$button_notificationModalApprove.click();
      this.$modal_backdrop.waitForDisplayed({ timeout: 5000, reverse: true });
      return true;
    } else if (this.$modal_simpleNotificationModal.isDisplayed()) {
      this.$button_simpleNotificationModalClose.click();
      return true;
    }
    return false;
  }
  waitForLoad() {
    this.$button_logout.waitForExist({
      timeout: 50000,
      timeoutMsg: `Кнопка ВЫХОД/Разлогиниться не появилась на странице ${browser.getUrl()} по истечение 50 сек`,
    });
    this.$overlay_loading.waitForExist({ timeout: 20000, reverse: true });
    browser.pause(750);
    while (this.gostClose());
    while (this.closeNotification());
    while (this.closeAlert());
  }
  private gostClose() {
    let target = this.$button_gost_close;
    if (target.isDisplayed()) {
      target.scrollIntoView({ block: "center", inline: "center" });
      target.click();
      this.$modal_backdrop.waitForDisplayed({ timeout: 5000, reverse: true });
      return true;
    } else return false;
  }
  private closeAlert() {
    if (browser.isAlertOpen()) {
      browser.acceptAlert();
      return true;
    } else return false;
  }
  createNewReport(reportType: BaResidentialNewReportTypes) {
    this.$button_newReportToModal.click();
    this.$modal_reportSelection.waitForDisplayed({});
    this.$modal_reportSelection.$(`.modal-body a[onclick^=${reportType}]`).click();
  }
  logout() {
    let button = this.$button_logout;

    button.waitForExist();
    button.scrollIntoView({ block: "center", inline: "center" });
    button.waitForClickable();
    button.click();
  }
  getCompanyMoneyData() {
    let regularToGetMoney = /\d+/;
    let moneyCountAsString: string = this.$text_accountMoney;
    let moneyCountAsNumber: number;

    return (moneyCountAsNumber = parseInt(
      regularToGetMoney.exec(moneyCountAsString.replace(/[\s]/g, ""))![0]
    ));
  }
}
/** Основная страница - "/index.html" */
export const baMainPage = new BaMainPage();
