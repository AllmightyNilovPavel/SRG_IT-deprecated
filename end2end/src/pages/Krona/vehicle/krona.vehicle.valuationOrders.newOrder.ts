class KronaVehicleValuationOrdersNewOrder {
  path = "/valuation/order/auto/new";

  get $checkbox_badVin() {
    // галочка "нестандартный VIN"
    return browser.$("#nonstandardVin");
  }
  get $input_Vin() {
    // поле ввода VIN
    return browser.$("#vin");
  }
  get $input_Mileage() {
    // поле ввода Пробега
    return browser.$("#mileagePretty");
  }
  get $input_ownerContactName() {
    // ФИО собственника
    return browser.$("#ownerContact.name");
  }
  get $input_ownerContactEmail() {
    // Имейл собственника
    return browser.$("#ownerContact.email");
  }
  get $input_ownerContactPhone() {
    // телефон собственника
    return browser.$("#ownerContact.phone");
  }
  get $input_credAgreement() {
    // поле ввода "Кредитный договор"
    return browser.$("#creditAgreement");
  }
  get $input_mortgageContract() {
    // поле ввода "Договор залога"
    return browser.$("#mortgageContract");
  }
  get $input_borrowerContactName() {
    // ФИО заёмщика
    return browser.$("#borrowerContact.name");
  }
  get $input_borrowerContactEmail() {
    // Имейл заёмщика
    return browser.$("#borrowerContact.email");
  }
  get $input_borrowerContactPhone() {
    // телефон заёмщика
    return browser.$("#borrowerContact.phone");
  }
  get $selector_ownerType() {
    // тип собстенника Физ.лицо\Юр.лицо\Банк
    return browser.$("#ownerContact.type");
  }
  get $selector_borrowerType() {
    // тип заёмщика Совпадает\Физ.лицо\Юр.лицо
    return browser.$("ownerContact.type");
  }
  get $selector_vehicleType() {
    // тип авто
    return browser.$("#autoTypeCode");
  }
  get $selector_vehicleVendor() {
    // производитель авто
    return browser.$("#vendorCode");
  }
  get $selector_releaseDateMonth() {
    return browser.$("#releaseMonth");
  }
  get $selector_releaseDateYear() {
    return browser.$("#releaseYear");
  }
  get $selector_vehicleModel() {
    return browser.$("#modelCode");
  }
  get $selector_vehicleBody() {
    return browser.$("#caseTypeGroup");
  }
  get $selector_vehicleEngine() {
    return browser.$("#engineGroup");
  }
  get $selector_vehicleTansmission() {
    return browser.$("#transmissionCode");
  }
  get $selector_vehicleModification() {
    return browser.$("#modificationGroup");
  }
  get $selector_ownersCount() {
    return browser.$("#owners");
  }
  get $selector_Accidents() {
    return browser.$("#accident");
  }
  get $selector_tireState() {
    return browser.$("#tireState");
  }
  get $selector_valuationReason() {
    return browser.$("#valuationReason");
  }
  get $selector_Burdening() {
    return browser.$("#burdening");
  }
  get $selector_externalInspection() {
    return browser.$("#externalInspection");
  }
  get $selector_internalInspection() {
    return browser.$("#internalInspection");
  }
  get $selector_caseDefects() {
    return browser.$("#caseDefects");
  }
  get $input_vehiclePrice() {
    return browser.$("#pricePretty");
  }
  get $selector_singleVisit() {
    return browser.$("#singleVisit");
  }
  get $selector_engineStart() {
    return browser.$("#engineStart");
  }
  get $selector_carMovable() {
    return browser.$("#isCarServiceable");
  }
  get $selector_Diagnostic() {
    return browser.$("#diagnosticReport");
  }
  get $selector_Appraiser() {
    return browser.$("#appraiser");
  }
  get $input_contactsBank() {
    return browser.$("#contacts");
  }
  get $file_vehiclePts() {
    return browser.$(
      "div.form-group:nth-child(43) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)"
    );
  }
  get $file_vehicleInspectionAct() {
    return browser.$(
      "div.form-group:nth-child(44) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)"
    );
  }
  get $file_vehiclePhotos() {
    return browser.$(
      "div.form-group:nth-child(45) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)"
    );
  }
  get $file_vehicleDefectSheet() {
    return browser.$(
      "div.form-group:nth-child(46) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)"
    );
  }
  get $file_vehicleOtherFiles() {
    return browser.$(
      "div.form-group:nth-child(47) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)"
    );
  }
}
/** БЗО. ТС. Заказ оценки */
export const kronaVehicleValuationOrdersNewOrder = new KronaVehicleValuationOrdersNewOrder();
