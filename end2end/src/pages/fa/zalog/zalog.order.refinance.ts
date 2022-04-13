import {
  FA_ownershipType,
  FA_OrderChannel,
  InspectionTimeBlock,
  FaOrderPaymentType,
} from "../enum";

class ZalogOrderRefinance {
  path = "/refinance/order";
  path_special = "/special_refinance/order";

  paymentSuccessMessage: string[] = [
    "Ваш заказ успешно отправлен. Будет произведена оплата картой.",
    "Ваш заказ успешно отправлен. Будет произведена оплата квитанцией.",
    "Ваш заказ успешно отправлен. Будет произведена оплата наличными.",
  ];
  text_successfulInvoicePayment =
    "Ваш заказ успешно отправлен. Будет произведена оплата квитанцией.";
  text_successfullCashPayment = "Ваш заказ успешно отправлен. Будет произведена оплата наличными.";

  /** Корень страницы */
  private get $order_root() {
    return $(`div[class*="Order_root"]`);
  }
  private get $order_footer() {
    return $(`div[class^="Order_footer"]`);
  }
  /** Блок содержания страницы */
  private get $order_content() {
    return this.$order_root.$(`div[class*="Order_content"]`);
  }
  private get $orderContent_payBlock() {
    return this.$order_content.$(`div[class^="Order_payBlock"]`);
  }
  /** Таблица с инфой о заказе */
  private get $order_summary() {
    return this.$order_content.$(`div[class*="Order_summary"]`);
  }
  /** Кнопка "Квартира" */
  private get $button_flat() {
    return this.$order_content.$(`#resaleOrNewbuilding`);
  }
  /** Кнопка "Апартаменты" */
  private get $button_apartment() {
    return this.$order_content.$(`#apartments`);
  }
  // -------------------------------------------------------------
  /**  */
  private get $button_Ownership() {
    return this.$order_content.$(`label[for="ownership"]`);
  }
  get $ownership_buttonChecker() {
    return this.$order_content.$(`#ownership`);
  }
  /**  */
  private get $button_notOwnership() {
    return this.$order_content.$(`label[for="notOwnership"]`);
  }
  get $notOwnership_buttonChecker() {
    return this.$order_content.$(`#notOwnership`);
  }
  // -------------------------------------------------------------
  /** Кнопка "Выбрать ОК" */
  get $button_chooseAppraiser() {
    return this.$order_content.$(`#chooseButton`);
  }
  get $text_appraisalCompanyName() {
    return this.$order_content.$(`#appraisalCompanySelect > div.text`).getText();
  }
  /** Окно выбора оценочной компании */
  private get $modal_selectAppraiser_base() {
    return $(`//div[@id='appraisalModal']`);
  }
  /**  */
  private get $checkbox_weekendInspection() {
    return this.$modal_selectAppraiser_base.$(`#INSPECTION_IN_WEEKEND`);
  }
  /** Корень таблицы выбора оценочной компании */
  private get $modal_selectAppraiser_table() {
    return this.$modal_selectAppraiser_base.$(`//table[@id='appraisalSortTable']`);
  }
  /** Первая в таблице кнопка "Выбрать" (обычно это 'Зарница') */
  private get $button_selectAppraiser() {
    return this.$modal_selectAppraiser_table.$(`button[class*='Order_buttonOrder']`);
  }
  // ---------------------------------------------------------------------------------
  /** Поле выбора Кредитного инспектора банка */
  get $base_bankManagerSelect() {
    return this.$order_content.$(`#bankManagerSelect`);
  }
  private get $input_bankManager() {
    return this.$base_bankManagerSelect.$(`input.search`);
  }
  get $text_bankManagerName() {
    return this.$base_bankManagerSelect.$(`div.text`);
  }
  private get $bankManager_selectList() {
    return this.$base_bankManagerSelect.$(`div.visible.menu.transition`);
  }
  private get $bankManager_listFirstValue() {
    return this.$bankManager_selectList.$(`div.selected.item`);
  }
  // ---------------------------------------------------------------------------------
  /**
   *  Заказчик "Имя"
   * `input#customerName_firstName`
   */
  get $input_customerFirstName() {
    return this.$order_root.$(`input#customerName_firstName`);
  }
  /**
   *  Заказчик "Фамилия"
   * `input#customerName_lastName`
   */
  get $input_customerLastName() {
    return this.$order_root.$(`input#customerName_lastName`);
  }
  /**
   * Заказчик "отчество"
   * `input#customerName_patronymi`
   */
  get $input_customerPatronymic() {
    return this.$order_root.$(`input#customerName_patronymic`);
  }
  /** Email для откправки сообщений */
  private get $input_customerEmail() {
    return this.$order_content.$(`#customerEmail`);
  }
  /** Оповещения через Email */
  private get $button_notificationEmail() {
    return this.$order_content.$(`#notificationEmail`);
  }
  /** Оповещения через SMS */
  private get $button_notificationSMS() {
    return this.$order_content.$(`#notificationSMS`);
  }
  // ----------------------------------------------------------------------
  /**
   *  Заёмщик "Имя"
   * `input#borrowerName_firstName`
   */
  get $input_borrowerFirstName() {
    return this.$order_root.$(`input#borrowerName_firstName`);
  }
  /**
   *  Заёмщик "Фамилия"
   * `input#borrowerName_lastName`
   */
  get $input_borrowerLastName() {
    return this.$order_root.$(`input#borrowerName_lastName`);
  }
  /**
   * Заёмщик "отчество"
   * `input#borrowerName_patronymic`
   */
  get $input_borrowerPatronymic() {
    return this.$order_root.$(`input#borrowerName_patronymic`);
  }
  // ----------------------------------------------------------------------
  /** Галочка "Заказчик и Заёщик одно лицо" */
  private get $checkbox_borrowerAsCustomer() {
    return this.$order_content.$(`label[for="borrowerAsCustomer"]`);
  }
  get $borrowerAsCustomer_checkboxChecker() {
    return this.$order_content.$(`#borrowerAsCustomer`);
  }

  /** Контакт представителя (Показывающего объект) */
  private get $input_agentPhone() {
    return this.$order_content.$(`#agentPhone`);
  }
  /** Поле "Комментарий" под телефоном */
  private get $input_agentComment() {
    return this.$order_content.$(`#agentPhoneComment`);
  }
  /** Желаемая дата осмотра */
  get $date_inspectionDate() {
    return this.$order_content.$(`#inspectionDate`);
  }
  /**  */
  get $text_currentInspectionDate() {
    return this.$date_inspectionDate.getText();
  }
  /** Идентификатор текущей даты */
  get $date_inspectionCurrentDay() {
    return this.$order_content.$(`div.rdtPicker td.rdtToday`);
  }
  // -----------------------------------------------------------------------------
  /** Желаемое время осмотра */
  get $selector_inspectionTimeBlock() {
    return this.$order_content.$(`#inspectionTimeBlock`);
  }
  private get $$options_inspectionTimeBlock() {
    return $$(`#inspectionTimeBlock div.menu div.item`);
  }
  get $text_inspectionTimeBlock() {
    return this.$selector_inspectionTimeBlock.$(`div.text`).getText();
  }
  // -----------------------------------------------------------------------------
  /** Комментарий к заказу */
  private get $input_orderComment() {
    return this.$order_content.$(`#comment`);
  }
  // ------------------------------------------------------------------------------
  /** Чекбокс "Согласен с договором оферты" */
  private get $checkbox_agreeWithOfferContract() {
    return this.$order_content.$(`label[for="agreeWithOfferContract"]`);
  }
  get $agreeWithOfferContract_checkboxChecker() {
    return this.$order_content.$(`#agreeWithOfferContract`);
  }
  /**  */
  private get $checkbox_agreeWithAppraisalTerms() {
    return this.$order_content.$(`label[for="agreeWithAppraisalTerms"]`);
  }
  get $agreeWithAppraisalTerms_checkboxChecker() {
    return this.$order_content.$(`#agreeWithAppraisalTerms`);
  }
  /** Чекбокс "... обработка перс. данных" */
  private get $checkbox_agreeWithPersonalDataProcessing() {
    return this.$order_content.$(`label[for="agreeWithPersonalDataProcessing"]`);
  }
  get $agreeWithPersonalDataProcessing_checkboxChecker() {
    return this.$order_content.$(`#agreeWithPersonalDataProcessing`);
  }
  // ------------------------------------------------------------------------------
  /** Удалить черновик */
  get $button_deleteDraft() {
    return this.$order_footer.$(`#actionDeleteButton`);
  }
  /** Сохранить черновик */
  get $button_saveDraft() {
    return this.$order_footer.$(`#actionSaveButton`);
  }
  /** Кнопка "Далее" */
  get $button_nextOrderPart() {
    return this.$order_footer.$(`#actionNextButton`);
  }

  // ------------------------------------------------------------------------------
  get $base_docksBlock() {
    return this.$order_content.$(`#legalDocuments`);
  }
  get $noDocuments_checkboxChecker() {
    return this.$base_docksBlock.$(`div.checkbox > input#noDocuments`);
  }
  get $checkbox_noDocuments() {
    return this.$order_content.$(`label[for="noDocuments"]`);
  }
  // ------------------------------------------------------------------------------
  /**  */
  private get $file_ownershipRights() {
    return this.$order_content.$(``);
  }
  /**  */
  private get $file_techDocuments() {
    return this.$order_content.$(``);
  }
  // ------------------------------------------------------------------------------
  get $button_payByInvoice() {
    // return this.$orderContent_payBlock.$(`//h3[contains(text(),'квитанции')]/..`);
    return $(`//h3[contains(text(),'Оплатить наличными')]/../..`);
  }
  /** Оплатить картой */
  get $button_payByCard() {
    // return this.$orderContent_payBlock.$(`#payByCardModal`);
    return $(`//h3[contains(text(),'Оплатить картой')]/../..`);
  }
  /** Кнопка "оплатить картой" */
  get $button_send_PayByCard() {
    return this.$order_content.$("#payByCardModal");
  }
  /** Кнопка "Оправить ссылку на оплату картой" */
  get $button_sendPaymentLink() {
    return this.$orderContent_payBlock.$(`#sendLinkToPayModal`);
  }
  /** Кнопка "скачать квитанцию" */
  get $button_downloadInvoice() {
    return this.$order_content.$(`#downloadInvoiceModal`);
  }
  /** Кнопка "Оплатить наличными" */
  get $button_payByCash() {
    return this.$order_content.$(`#payByCashModal`);
  }
  // ---------------------------------------------------------------------------
  /**  */
  get $root_modalOrderPayment() {
    return $(`div[class*="Order_paymentsModal"]`);
  }
  /**  */
  get $checkbox_agreeWithValidData() {
    return this.$root_modalOrderPayment.$(`label[for="agreeWithValidData"]`);
  }
  get $agreeWithValidData_checkboxChecker() {
    return this.$root_modalOrderPayment.$(`#agreeWithValidData`);
  }
  get $button_actionPayByCard() {
    return this.$root_modalOrderPayment.$(`button#actionPayByCard`);
  }
  get $button_actionDownloadInvoice() {
    return this.$root_modalOrderPayment.$(`button#downloadInvoice`);
  }
  private get $button_backToOrder() {
    return this.$root_modalOrderPayment.$(`button#backToStart`);
  }
  // ---------------------------------------------------------------------------
  /**  */
  get $textArea_bottomMessage() {
    return this.$order_footer.$(`#bottomMessage`);
  }
  get $text_bottomMessageData() {
    return this.$textArea_bottomMessage.$(`div.content > p`);
  }
  get $text_Order_payMessage() {
    return this.$text_Order_payMessage.$(`#orderStep3Link`);
  }
  // ------------------------------------------------------------------------
  waitForLoad() {
    console.log(browser.getUrl());
    browser.waitUntil(
      () =>
        (browser.getUrl().match(this.path_special) !== null ||
          browser.getUrl().match(this.path) !== null) &&
        this.$order_summary.isDisplayed()
    );
  }
  waitForPaymentComplete(paymentType: FaOrderPaymentType) {
    browser.waitUntil(
      () =>
        this.$order_footer
          .$(`#bottomMessage div.content > p`)
          .getText()
          .match(this.paymentSuccessMessage[paymentType]) !== null
    );
  }
  select_ownership(ownership: FA_ownershipType) {
    ownership === FA_ownershipType.OWNERSHIP
      ? this.$button_Ownership.click({ button: 0, x: 0, y: 0 })
      : this.$button_notOwnership.click({ button: 0, x: 0, y: 0 });
  }
  select_appraiser(appraiser?: string) {
    this.$button_chooseAppraiser.waitForClickable();
    this.$button_chooseAppraiser.click();
    this.$modal_selectAppraiser_base.waitForDisplayed({ timeout: 10000, reverse: false });

    if (appraiser) {
      let target = $(
        `//tr/td[contains(text(),'${appraiser}')]/..//button[contains(@class,'Order_buttonOrder')]`
      );
      target.waitForClickable();
      target.click();
    } else {
      this.$button_selectAppraiser.waitForClickable();
      this.$button_selectAppraiser.click();
    }

    this.$modal_selectAppraiser_base.waitForDisplayed({ timeout: 10000, reverse: true });
  }
  input_bankManager(manager: string) {
    this.$base_bankManagerSelect.waitForClickable();
    this.$base_bankManagerSelect.click();
    this.$bankManager_selectList.waitForDisplayed({});
    this.$input_bankManager.setValue(manager);
    this.$bankManager_listFirstValue.waitForDisplayed({});
    this.$bankManager_listFirstValue.waitForClickable();
    this.$bankManager_listFirstValue.click();
  }
  select_borrower(sameAsCustomer: boolean, borrowerName?: string) {
    if (sameAsCustomer === true) this.$checkbox_borrowerAsCustomer.click({ button: 0, x: 0, y: 0 });
    else if (borrowerName !== null) {
    }
  }
  /**
   * Функция выбора даты осмотра
   *
   * @param date - если не указан то берётся сегодняшняя дата
   */
  select_date(date? /* TODO */) {
    this.$date_inspectionDate.scrollIntoView();
    this.$date_inspectionDate.click();
    this.$date_inspectionCurrentDay.waitForDisplayed({});
    this.$date_inspectionCurrentDay.click();
    console.log(`Выбранная дата: `, this.$text_currentInspectionDate);
  }
  select_inspectionTime(inspectionTime: InspectionTimeBlock) {
    this.$selector_inspectionTimeBlock.scrollIntoView();
    this.$selector_inspectionTimeBlock.click();
    this.$$options_inspectionTimeBlock[inspectionTime].waitForDisplayed({});
    this.$$options_inspectionTimeBlock[inspectionTime].click();
  }
  select_agreeCheckboxes(orderChannel: FA_OrderChannel) {
    switch (orderChannel) {
      case FA_OrderChannel.SMART:
        this.$checkbox_agreeWithPersonalDataProcessing.scrollIntoView();
        this.$agreeWithOfferContract_checkboxChecker.click({ button: 0, x: 0, y: 0 });
        this.$agreeWithAppraisalTerms_checkboxChecker.click({ button: 0, x: 0, y: 0 });
        this.$agreeWithPersonalDataProcessing_checkboxChecker.click({ button: 0, x: 0, y: 0 });
        break;

      default:
        this.$checkbox_agreeWithPersonalDataProcessing.scrollIntoView();
        this.$agreeWithOfferContract_checkboxChecker.click({ button: 0, x: 0, y: 0 });
        // this.$agreeWithAppraisalTerms_checkboxChecker.click({button: 0, x: 0, y: 0});
        this.$agreeWithPersonalDataProcessing_checkboxChecker.click({ button: 0, x: 0, y: 0 });
        break;
    }
  }
}

export const zalogOrderRefinance = new ZalogOrderRefinance();
