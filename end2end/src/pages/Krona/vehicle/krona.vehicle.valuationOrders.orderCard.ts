class KronaVehicleValuationOrdersOrderCardver2 {
  path = "/valuation/order/auto/ver2";

  /** Корень страницы */
  private get $root() {
    return $(`div.container-fluid.auto`);
  }
  /** Лог запросов в Трансдекру */
  public get $button_TransdekraLog() {
    return this.$root.$(`a[href^="log/"]`);
  }
  /** Информация о текущем статусе Заказа */
  public get $info_orderStatus() {
    return this.$root_orderData.$(`/html/body/div[2]/div[3]/div/div[2]`);
  }

  /** Корень блока с историяи верификации */
  private get $root_orderHistory() {
    return this.$root.$(`div#autoUzidar`);
  }
  /** Таблица "История верификации отчёта"*/
  get $table_History() {
    return this.$root_orderHistory.$$(`table.verificationHistory`)[0];
  }
  /** Таблица "История оценок"*/
  get $table_verificationHistory() {
    return this.$root_orderHistory.$$(`table.verificationHistory`)[1];
  }

  /** Корень закладок навигации */
  private get $root_orderTabs() {
    return this.$root.$(`ul#autoForm-tabs`);
  }
  /** Закладка с данными по заказу */
  get $tabs_order() {
    return this.$root_orderTabs.$(`a[role='tab'][href='#autoForm-order']`);
    // return this.$root_orderTabs.$(`div[role='tabpanel']#autoForm-order`)
  }

  /** Корень блока данных по заказу */
  private get $root_orderData() {
    return this.$root.$(`div.tab-content > div#autoForm-order`);
  }
  get $checkbox_nonStandartVin() {
    // галочка "Нестандартный VIN"
    return this.$root_orderData.$(`#nonstandardVin`);
  }
  /** поле ввода VIN */
  get $input_Vin() {
    return this.$root_orderData.$(`#vin`);
  }
  /** поле ввода Пробега */
  get $input_Mileage() {
    return this.$root_orderData.$(`#mileagePretty`);
  }
  /** ФИО собственника */
  get $input_ownerContactName() {
    return this.$root_orderData.$(`#ownerContact.name`);
  }
  /** Имейл собственника */
  get $input_ownerContactEmail() {
    return this.$root_orderData.$(`#ownerContact.email`);
  }
  /** телефон собственника */
  get $input_ownerContactPhone() {
    return this.$root_orderData.$(`#ownerContact.phone`);
  }
  /** поле ввода "Кредитный договор" */
  get $input_credAgreement() {
    return this.$root_orderData.$(`#creditAgreement`);
  }
  /** поле ввода "Договор залога" */
  get $input_mortgageContract() {
    return this.$root_orderData.$(`#mortgageContract`);
  }
  /** ФИО заёмщика */
  get $input_borrowerContactName() {
    return this.$root_orderData.$(`#borrowerContact.name`);
  }
  /** Имейл заёмщика */
  get $input_borrowerContactEmail() {
    return this.$root_orderData.$(`#borrowerContact.email`);
  }
  /** телефон заёмщика */
  get $input_borrowerContactPhone() {
    return this.$root_orderData.$(`#borrowerContact.phone`);
  }
  /** тип собстенника Физ.лицо\Юр.лицо\Банк */
  get $selector_ownerType() {
    return this.$root_orderData.$(`#ownerContact.type`);
  }
  /** тип заёмщика Совпадает\Физ.лицо\Юр.лицо */
  get $selector_borrowerType() {
    return this.$root_orderData.$(`ownerContact.type`);
  }
  /** тип авто */
  get $selector_vehicleType() {
    return this.$root_orderData.$(`#autoTypeCode`);
  }
  /** производитель авто */
  get $selector_vehicleVendor() {
    return this.$root_orderData.$(`#vendorCode`);
  }
  get $selector_releaseDateMonth() {
    return this.$root_orderData.$(`#releaseMonth`);
  }
  get $selector_releaseDateYear() {
    return this.$root_orderData.$(`#releaseYear`);
  }
  get $selector_vehicleModel() {
    return this.$root_orderData.$(`#modelCode`);
  }
  get $selector_vehicleBody() {
    return this.$root_orderData.$(`#caseTypeGroup`);
  }
  get $selector_vehicleEngine() {
    return this.$root_orderData.$(`#engineGroup`);
  }
  get $selector_vehicleTansmission() {
    return this.$root_orderData.$(`#transmissionCode`);
  }
  get $selector_vehicleModification() {
    return this.$root_orderData.$(`#modificationGroup`);
  }
  get $selector_ownersCount() {
    return this.$root_orderData.$(`#owners`);
  }
  get $selector_Accidents() {
    return this.$root_orderData.$(`#accident`);
  }
  get $selector_tireState() {
    return this.$root_orderData.$(`#tireState`);
  }
  get $selector_valuationReason() {
    return this.$root_orderData.$(`#valuationReason`);
  }
  get $selector_Burdening() {
    return this.$root_orderData.$(`#burdening`);
  }
  get $selector_externalInspection() {
    return this.$root_orderData.$(`#externalInspection`);
  }
  get $selector_internalInspection() {
    return this.$root_orderData.$(`#internalInspection`);
  }
  get $selector_caseDefects() {
    return this.$root_orderData.$(`#caseDefects`);
  }
  get $input_vehiclePrice() {
    return this.$root_orderData.$(`#pricePretty`);
  }
  get $selector_singleVisit() {
    return this.$root_orderData.$(`#singleVisit`);
  }
  get $selector_engineStart() {
    return this.$root_orderData.$(`#engineStart`);
  }
  get $selector_carMovable() {
    return this.$root_orderData.$(`#isCarServiceable`);
  }
  get $selector_Diagnostic() {
    return this.$root_orderData.$(`#diagnosticReport`);
  }
  /** Оценщик `#appraiser` */
  get $selector_Appraiser() {
    return this.$root_orderData.$(`#appraiser`);
  }
  get $input_contactsBank() {
    return this.$root_orderData.$(`#contacts`);
  }
  get $file_vehiclePts() {
    return this.$root_orderData.$(
      `div.form-group:nth-child(43) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)`
    );
  }
  get $file_vehicleInspectionAct() {
    return this.$root_orderData.$(
      `div.form-group:nth-child(44) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)`
    );
  }
  get $file_vehiclePhotos() {
    return this.$root_orderData.$(
      `div.form-group:nth-child(45) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)`
    );
  }
  get $file_vehicleDefectSheet() {
    return this.$root_orderData.$(
      `div.form-group:nth-child(46) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)`
    );
  }
  get $file_vehicleOtherFiles() {
    return this.$root_orderData.$(
      `div.form-group:nth-child(47) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)`
    );
  }
  // -------------------------- Кнопки --------------------------
  /** Кнопка "Вернуть в работу" */
  public get $button_Revoke() {
    return $(`#requestToRevoke`);
  }
  /** Кнопка "Повторить заказ" */
  public get $button_clone() {
    return $(`#cloneOrderVer2`);
  }
  /** Кнопка "Отправить" */
  get $button_sendOrder() {
    return $(`#sendOrder`);
  }
  get $button_saveOrder() {
    return $(`#saveOrder`);
  }

  // --------------------------- Функции --------------------------

  selectAppraiser(appraiser: string) {
    this.$selector_Appraiser.selectByAttribute("value", appraiser);
  }
  setVinNumber(vinNumber: string) {
    if (!$(`//input[@id='nonstandardVin']`).getAttribute("checked"))
      this.$checkbox_nonStandartVin.click();

    this.$input_Vin.scrollIntoView();
    this.$input_Vin.setValue(vinNumber);
  }
  waitForLoad() {
    this.$root_orderData.waitUntil(
      () => this.$root_orderData.getUrl().match(/* this.path + */ /\/ver2\/\d{5,}/g) !== null
    );
    $(`div.autoForm-header-left`).isDisplayed();
    $(`div.autoForm-header-right`).isDisplayed();
    $(`div#autoForm`).isDisplayed();
  }
}

/** Карточка заказа БЗО.ТС */
export const kronaVehicleValuationOrdersOrderCardver2 =
  new KronaVehicleValuationOrdersOrderCardver2();
