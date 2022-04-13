import { BaResidentialReportBase } from "../declarations/ba.residential.report.base";
import { BaResidentialSignType, CloneOptions } from "../../enums";
import { debugLogging, makeScreenshot } from "modules";

export class BaResidentialReportActions {
  Base = new BaResidentialReportBase();

  /** Загрузка страницы */
  waitForLoad() {
    browser.waitUntil(() => browser.getUrl().match(/report\.html/) !== null, {
      timeout: 50000,
      timeoutMsg: `Ошибка загрузки страницы отчёта: ${browser.getUrl()}`,
    });
    if (this.Base.$overlayReportVersionChoiceRoot.isDisplayed()) {
      this.Base.$buttonChoseServerVersion.waitForClickable();
      this.Base.$buttonChoseServerVersion.click();
      this.Base.$overlayReportVersionChoiceRoot.waitForDisplayed({
        reverse: true,
        timeoutMsg: `Ошибка выбора версии отчёта`,
      });
    }
    browser.waitUntil(
      () =>
        this.Base.$button_saveReport.isClickable() || this.Base.$button_revokeReport.isClickable(),
      {
        timeout: 50000,
        timeoutMsg: `Ошибка загрузки страницы отчёта: ${browser.getUrl()}`,
      }
    );
    debugLogging("Тестовый отчёт ", browser.getUrl());
  }
  /**  */
  mapDataChangedModalClose() {
    // let mapChangedModalBase:WebdriverIO.Element
    // let mapChangedModalCloseButton:WebdriverIO.Element
    // mapChangedModalBase = browser.$(`//strong[contains(text(),'Карта устарела или была изменена.')]/../..`)
    // mapChangedModalCloseButton = mapChangedModalBase.$(`//a[@data-handler='1']`)

    if (this.Base.$mapChangedModalBase.isDisplayed()) {
      this.Base.$mapChangedModalCloseButton.waitForClickable();
      this.Base.$mapChangedModalCloseButton.click();
      this.Base.$mapChangedModalBase.waitForDisplayed({
        reverse: true,
        timeout: 10000,
        timeoutMsg: `Уведомление о том что карта изменилось - не исчесзло после подтверждения.`,
      });
    }
  }
  /** Оплатить отчёт */
  payReport() {
    debugLogging("Оплата отчёта");

    this.Base.$button_payReport.scrollIntoView();
    this.Base.$button_payReport.isDisplayed();
    this.Base.$button_payReport.click();
    this.mapDataChangedModalClose();
    this.Base.$overlay_confirm.waitForDisplayed({});

    this.Base.$button_payConfirm.waitForClickable();
    this.Base.$button_payConfirm.click();
    this.Base.$overlay_confirm.waitForDisplayed({});

    this.Base.$button_deleteConfirm.waitForClickable();
    this.Base.$button_deleteConfirm.click();
    debugLogging("Оплата отчёта прошла успешно");
  }
  /** Сохранить отчёт */
  saveReport() {
    debugLogging("Сохранение отчёта");
    this.Base.$button_saveReport.scrollIntoView();
    this.Base.$button_saveReport.waitForClickable();
    this.Base.$button_saveReport.click();
    this.mapDataChangedModalClose();
    this.Base.$overlay_saveConfirm.waitForDisplayed({});
    this.Base.$button_saveConfirm.click();
    browser.refresh();
    this.waitForLoad();
  }
  /** Проверить отчёт */
  checkReport() {
    this.Base.$button_checkReport.scrollIntoView();
    this.Base.$button_checkReport.click();
    browser.pause(500);
  }
  /** Удалить отчёт */
  deleteReport() {
    debugLogging("Удаление отчёта");
    let temp: string;

    this.Base.$button_deleteReport.scrollIntoView();
    this.Base.$button_deleteReport.waitForDisplayed({});
    this.Base.$button_deleteReport.click();
    this.Base.$overlay_confirm.waitForDisplayed({});
    this.Base.$button_deleteConfirm.click();
    this.Base.$overlay_deleteSuccess.waitForDisplayed({});
    temp = this.Base.$overlay_deleteSuccess.getText();
    if (temp === "Отчет успешно удален!") this.Base.$button_deleteSuccessConfirm.click();
  }
  /** Клонировать отчёт */
  cloneReport(cloneOption: CloneOptions) {
    debugLogging("Клонирование отчёта");

    this.Base.$button_clone.scrollIntoView();
    this.Base.$button_clone.waitForDisplayed({});
    this.Base.$button_clone.click();

    this.Base.$modal_cloneReportOptions.waitForDisplayed({});
    this.Base.$modal_cloneReportOptions.$(`${cloneOption}`).click();
    this.Base.$button_cloneReportOptionsConfirm.click();

    if (browser.isAlertOpen()) browser.acceptAlert();
  }
  private confirmVtbReportData() {
    browser.pause(1000);
    let self = this.Base;
    if (self.$overlay_signReportVtb.isDisplayed()) {
      self.$checkbox_confirmVtbReportData.waitForDisplayed({});
      self.$checkbox_confirmVtbReportData.click();
      self.$button_confirmVtbReportData.waitForEnabled();
      self.$button_confirmVtbReportData.click();
    }
  }
  private confirmVtbConsent() {
    browser.pause(1000);
    let self = this.Base;
    if (self.$overlay_vtbConsentModal.isDisplayed()) {
      self.$checkbox_vtbConsentAppraiserAgreed.waitForDisplayed();
      self.$checkbox_vtbConsentAppraiserAgreed.click();
      self.$checkbox_vtbConsentCustomerConfirms.waitForDisplayed();
      self.$checkbox_vtbConsentCustomerConfirms.click();
      self.$button_vtbConsentConfirm.waitForClickable();
      self.$button_vtbConsentConfirm.click();
      self.$overlay_vtbConsentModal.waitForDisplayed({
        timeout: 1000,
        reverse: true,
        timeoutMsg: `Окно подтверждения соглашения для ВТБ не исчезло.`,
      });
    }
  }
  acceptUnsavedChanges() {
    browser.pause(1000);
    const unsavedChangesModalRoot = $(
      `//div[@class='modal-body'][contains(text(),'Вы не сохранили изменения.')]/..`
    );
    const unsavedChangesConfirmButton = unsavedChangesModalRoot.$(`.//a[@data-handler='1']`);
    if (unsavedChangesModalRoot.isDisplayed()) {
      unsavedChangesConfirmButton.waitForClickable();
      unsavedChangesConfirmButton.click();
      unsavedChangesModalRoot.waitForDisplayed({ reverse: true });
    }
  }
  /**
   * Метод для подписи отчётов по Квартирам.
   * Нажимает на кнопку "подписать отчёт",
   * Подписывает либо паролем либо первой подписью ЭЦП из списка подписей.
   * После подписания переходит в реестр отчётов.
   * @param signType тип подписи
   * @param password пароль. Обязателен когда подписываем паролем.
   */
  signReport(signType: BaResidentialSignType, password: string) {
    debugLogging("Подпись отчёта");
    this.saveReport();

    this.Base.$button_signReport.scrollIntoView();
    this.Base.$button_signReport.waitForClickable();
    this.Base.$button_signReport.click();

    this.acceptUnsavedChanges();
    this.confirmVtbReportData();
    this.confirmVtbConsent();
    this.Base.$overlay_signReport.waitForDisplayed({
      timeout: 50000,
      timeoutMsg: `Окно подписания отчёта не появилось.`,
    });

    if (signType === BaResidentialSignType.PASSWORD) {
      if (password === "" || password === " ")
        throw new Error(`Не могу подписать отчёт потому что ПАРОЛЬ для подписи - пустой.`);

      try {
        this.Base.$selector_signatureType.waitForClickable({
          timeout: 30000,
          timeoutMsg: `Не удалось выбрать тип подписи.`,
        });
        this.Base.$selector_signatureType.selectByIndex(signType);
        this.Base.$input_signPwd.waitForClickable({
          timeout: 30000,
          timeoutMsg: `Не удалось ввести пароль.`,
        });
        this.Base.$input_signPwd.setValue(password);
        this.Base.$button_signReportWithPassword.waitForClickable({
          timeout: 30000,
          timeoutMsg: `Не удалось удалось подписать отчёт с помощью пароля.`,
        });
        makeScreenshot(`Подпись отчёта`);
        this.Base.$button_signReportWithPassword.click();
        this.Base.$modalSignReportSuccessRoot.waitForDisplayed({
          timeout: 60000,
          timeoutMsg: `Слишком долго подписывался отчёт.`,
        });
        this.Base.$buttonSignReportSuccessModalClose.waitForClickable();
        makeScreenshot(`Подтверждение подписи отчёта`);
        this.Base.$buttonSignReportSuccessModalClose.click();
        // this.Base.$buttonSignReportSuccessConfirm.click();
        // this.Base.$overlay_confirm.waitForDisplayed({reverse:true})
        // browser.waitUntil(() => browser.getUrl().match('index.html') !== null)
        // browser.back()
        // browser.debug()
        browser.refresh();
        if (browser.isAlertOpen()) browser.acceptAlert();
        this.waitForLoad();
      } catch (e) {
        throw new Error(`Ошибка подписи отчёта ПАРОЛЕМ: ${e}`);
      }
      // browser.pause(1000);
      // if (browser.isAlertOpen()) browser.acceptAlert();
    } else if (signType === BaResidentialSignType.ECS) {
      try {
        this.Base.$selector_signatureType.waitForClickable({
          timeout: 60000,
          timeoutMsg: `Окно выбора типа подписи не появилось.`,
        });
        this.Base.$selector_signatureType.selectByIndex(signType);

        this.Base.$selector_ecs.selectByIndex(1);
        this.Base.$button_startEcsSign.click();
        this.Base.$overlay_confirm.waitForDisplayed({
          timeout: 60000,
          timeoutMsg: `Окно подтверждения успешной подписи - не появилось.`,
        });
        this.Base.$button_deleteConfirm.waitForClickable();
        this.Base.$button_deleteConfirm.click();
        browser.refresh();
        this.waitForLoad();
      } catch (e) {
        throw new Error(`Ошибка подписи отчёта с помощью ЭЦП: ${e}`);
      }
      // browser.pause(1000);
      // if (browser.isAlertOpen()) browser.acceptAlert();
    }
  }
  autofillFromAnotherReport() {
    this.Base.$button_autofillForm.scrollIntoView();
    this.Base.$button_autofillForm.waitForClickable();
    this.Base.$button_autofillForm.click();
    if (browser.isAlertOpen()) browser.acceptAlert();

    let message: WebdriverIO.Element = $(
      `//*[contains(text(),'Отчёт будет заполнен данными из другого отчёта')]`
    );
    let messageButton: WebdriverIO.Element = message.$(
      `//*[contains(text(),'Отчёт будет заполнен данными из другого отчёта')]/..//a`
    );
    message.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `Сообщение об автозаполнении отчёта не появилось. ${browser.getUrl()}`,
    });
    messageButton.scrollIntoView();
    messageButton.waitForClickable();
    messageButton.click();

    this.waitForLoad();
    this.saveReport();
    browser.refresh();
  }
}
