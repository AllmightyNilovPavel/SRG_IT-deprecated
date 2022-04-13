import { FA_ownershipType, FA_OrderChannel } from "../enum";

class ZalogOrderSpecialCredit {
  path = "/refinance/order";
  path_special = "/special_credit/order";

  text_successfulInvoicePayment =
    "Ваш заказ успешно отправлен. Будет произведена оплата квитанцией.";

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
    return $(`#appraisalModal`);
  }
  /**  */
  private get $checkbox_weekendInspection() {
    return this.$modal_selectAppraiser_base.$(`#INSPECTION_IN_WEEKEND`);
  }
  /** Корень таблицы выбора оценочной компании */
  private get $modal_selectAppraiser_table() {
    return this.$modal_selectAppraiser_base.$(`#appraisalSortTable`);
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
  /** ФИО заказчика оценки */
  private get $input_customerName() {
    return this.$order_content.$(`#customerName`);
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
  /** ФИО заёмщика в банке */
  private get $input_borrowerName() {
    return this.$order_content.$(`#borrowerName`);
  }
  get $text_borrowerName() {
    return this.$input_borrowerName.$(`input.search`).getText();
  }
  /**
   *  Заёмщик "Имя"
   * `input#firstName`
   */
  get $input_borrowerFirstName() {
    return $(`input#borrowerName_firstName`);
  }
  /**
   *  Заёмщик "Фамилия"
   * `input#lastName`
   */
  get $input_borrowerLastName() {
    return $(`input#borrowerName_lastName`);
  }
  /**
   * Заёмщик "отчество"
   * `input#patronymic`
   */
  get $input_borrowerPatronymic() {
    return $(`input#borrowerName_patronymic`);
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
  /** Чекбокс "Согласен с условиями Оценки" */
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
  private get $infoBlock_payByCard() {
    return this.$orderContent_payBlock.$(`div[class*="Order_payContainer"]`);
  }
  /** Оплатить картой */
  get $button_payByCard() {
    return this.$orderContent_payBlock.$(`ul[class^="Order_paymentFeatures"]`);
  }
  /** Кнопка "Оправить ссылку на оплату картой" */
  get $button_sendPaymentLink() {
    return this.$orderContent_payBlock.$(`#sendLinkToPayModal`);
  }
  /** Кнопка "Оплатить и отправить заказ" */
  get $button_submitCardPayment() {
    return this.$order_content.$(`#payByCardModal`);
  }
  // ------------------------------------------------------------------------------
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
  private get $root_modalOrderPayment() {
    return $(`div[class*="Order_paymentsModal"]`);
  }
  /**  */
  get $checkbox_agreeWithValidData() {
    return this.$root_modalOrderPayment.$(`label[for="agreeWithValidData"]`);
  }
  get $agreeWithValidData_checkboxChecker() {
    return this.$root_modalOrderPayment.$(`#agreeWithValidData`);
  }
  get $button_payByCardModalSubmit() {
    return this.$root_modalOrderPayment.$(`button#actionPayByCard`);
  }
  get $button_actionDownloadInvoice() {
    return this.$root_modalOrderPayment.$(`button#downloadInvoice`);
  }
  private get $button_backToOrder() {
    return this.$root_modalOrderPayment.$(`button#backToStart`);
  }

  private get $text_() {
    return;
  }
  // ---------------------------------------------------------------------------
  get $text_orderDocumentsMessage() {
    return this.$base_docksBlock.$(`div[class^="Order_documentsMessage"]`);
  }
  /**  */
  get $textArea_bottomMessage() {
    return this.$order_footer.$(`#bottomMessage`);
  }
  get $text_bottomMessageData() {
    return this.$textArea_bottomMessage.$(`div.content > p`);
  }
  get $text_successMessage() {
    return this.$orderContent_payBlock.$(`div.massive.success.message`);
  }

  // ------------------------------------------------------------------------
  waitForLoad() {
    // TODO
    if (1) {
      console.log(browser.getUrl());
      browser.waitUntil(
        () =>
          (browser.getUrl().match(this.path_special) !== null ||
            browser.getUrl().match(this.path) !== null) &&
          this.$order_summary.isDisplayed()
      );
    }
  }
  waitForPaymentComplete() {
    browser.waitUntil(
      () =>
        this.$order_footer
          .$(`#bottomMessage div.content > p`)
          .getText()
          .match(this.text_successfulInvoicePayment) !== null
    );
  }
  select_ownership(ownership: FA_ownershipType) {
    ownership === FA_ownershipType.OWNERSHIP
      ? this.$button_Ownership.click({ button: 0, x: 0, y: 0 })
      : this.$button_notOwnership.click({ button: 0, x: 0, y: 0 });
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
  payByCard() {
    this.$button_payByCard.waitForClickable();
    this.$button_payByCard.click();
    this.$infoBlock_payByCard.waitForDisplayed({ timeout: 1000, reverse: false });
    this.$button_submitCardPayment.waitForClickable();
    this.$button_submitCardPayment.click();

    this.$root_modalOrderPayment.waitForDisplayed({ timeout: 2000, reverse: false });
    // this.$agreeWithValidData_checkboxChecker.click();
    this.$checkbox_agreeWithValidData.click();

    this.$button_payByCardModalSubmit.waitForClickable();
    this.$button_payByCardModalSubmit.click();
  }
}

export const zalogOrderSpecialCredit = new ZalogOrderSpecialCredit();
