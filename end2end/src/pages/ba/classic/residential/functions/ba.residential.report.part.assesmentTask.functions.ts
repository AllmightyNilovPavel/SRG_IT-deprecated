import { FindElementByText } from "modules";

import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

import {
  BaResidentialBanks,
  BaResidentialOwnership,
  BaResidentialValuationPart,
  BaResidentialIsTownhouse,
  BuildingStage,
  BaResidentialObjectType,
  BaResidentialIntendedUse,
  BaReportResidentialRoundValueVariants,
  BaReportResidentialMapType,
  BaReportResidentialSpaceToChoose,
  BaReportResidentialCalculationAlgorithm,
  BaReportResidentialWearoutAlgorithm,
  BaReportResidentialPrintForm,
  BaResidentialReportCustomerTypes,
} from "../../enums";
import { BaResidentialReportPartAssesmentTask } from "../declarations/ba.residential.report.part.assesmentTask";

/**
 * Класс описывающий функции работы с блоком "Задание на оценку"
 * <br> `Для всех банков`
 *
 * @includes `BaResidentialReportPartAssesmentTask`
 */
export class BaResidentialReportPartAssesmentTaskFunctions extends BaResidentialReportPartAssesmentTask {
  /**
   * Функция заполнения поля `Предполагаемое использование результатов`
   *
   * @param intendedUse
   */
  private setIntentedUse(intendedUse: BaResidentialIntendedUse) {
    this.$input_intendedUse.waitForExist();
    this.$input_intendedUse.setValue(intendedUse);
  }
  /**
   * Функция выбора Оценщика и Подписанта.
   * <br> Для корректного заполнения нужно знать точные айдишники пользователей.
   *
   * @param appraiserId
   * @param bossId
   */
  setSignUsers(appraiserId: string, bossId: string) {
    this.$selector_appraiserSignatory.scrollIntoView();
    this.$selector_appraiserSignatory.selectByAttribute("value", appraiserId);
    console.log("Оценщик = ", this.$selector_appraiserSignatory.getValue());
    this.$selector_directorSignatory.scrollIntoView();
    this.$selector_directorSignatory.selectByAttribute("value", bossId);
    console.log("Директор = ", this.$selector_directorSignatory.getValue());
  }

  getSignUser() {
    return this.$selector_appraiserSignatory.getValue();
  }

  select_bank(bank: BaResidentialBanks) {
    this.$selector_bank.selectByAttribute("value", bank);
    this.residentialReportBase.$overlay_loading.waitForDisplayed({
      timeout: 10000,
      reverse: false,
    });
    this.residentialReportBase.$overlay_loading.waitForDisplayed({ timeout: 10000, reverse: true });
  }
  /**
   *
   * @param agreementNumber
   */
  setAgreementNumber(agreementNumber: string) {
    this.$input_agreementNumber.scrollIntoView();
    this.$input_agreementNumber.waitForClickable();
    this.$input_agreementNumber.setValue(agreementNumber);
  }
  /**
   * Функция заполнения поля "Дата договора"
   *
   * @param agreementDate
   */
  setAgreementDate(agreementDate?: string) {
    if (!agreementDate) {
      this.$input_agreementDate.scrollIntoView();
      this.$input_agreementDate.waitForClickable();
      this.$input_agreementDate.click();
      this.$input_agreementDate.setValue("f");
      browser.keys(["f", "Tab"]);
    } else {
      this.$input_agreementDate.click();
      this.$input_agreementDate.setValue(agreementDate);
    }
  }
  /**
   *
   * @param appraisalPurpose
   */
  setAppraisalPurpose(appraisalPurpose: string) {
    this.$input_appraisalPurpose.scrollIntoView();
    this.$input_appraisalPurpose.waitForClickable();
    this.$input_appraisalPurpose.setValue(appraisalPurpose);
  }
  setAppraisalOwnership(appraisalOwnership: string) {
    this.$input_appraisalOwnership.scrollIntoView();
    this.$input_appraisalOwnership.waitForClickable();
    this.$input_appraisalOwnership.setValue(appraisalOwnership);
  }
  setEncumbrances(encumbrances: string) {
    this.$input_encumbrances.scrollIntoView();
    this.$input_encumbrances.waitForClickable();
    this.$input_encumbrances.setValue(encumbrances);
  }
  selectCustomerType(customerType: BaResidentialReportCustomerTypes) {
    this.$selector_customerType.scrollIntoView();
    this.$selector_customerType.waitForClickable();
    this.$selector_customerType.selectByAttribute("value", customerType);
  }
  setCustomerFullName(customerFullName: string) {
    this.$input_customerFullName.scrollIntoView();
    this.$input_customerFullName.waitForClickable();
    this.$input_customerFullName.setValue(customerFullName);
  }
  setCustomerAddress(customerAddress: string) {
    this.$input_customerAddress.scrollIntoView();
    this.$input_customerAddress.waitForClickable();
    this.$input_customerAddress.clearValue();
    this.$input_customerAddress.setValue(customerAddress);
  }
  setCustomerPassportSerial(passportSerial: string) {
    this.$input_customerPassportSerial.scrollIntoView();
    this.$input_customerPassportSerial.waitForClickable();
    this.$input_customerPassportSerial.clearValue();
    this.$input_customerPassportSerial.setValue(passportSerial);
  }
  setCustomerPassportNumber(passportNumber: string) {
    this.$input_customerPassportNum.scrollIntoView();
    this.$input_customerPassportNum.waitForClickable();
    this.$input_customerPassportNum.clearValue();
    this.$input_customerPassportNum.setValue(passportNumber);
  }
  setCustomerPassportDate(passportDate?: string) {
    this.$input_customerPassportDate.scrollIntoView();
    this.$input_customerPassportDate.waitForClickable();
    if (passportDate) {
      this.$input_customerPassportDate.click();
      this.$input_customerPassportDate.setValue(passportDate);
      browser.keys("Tab");
    } else {
      this.$input_customerPassportDate.click();
      browser.keys(["f", "Tab"]);
    }
  }
  /**
   * Функция заполнения поля "Кем выдан паспорт"
   *
   * @param passportIssuer номер подразделения (строка)
   */
  setCustomerPassportIssuer(passportIssuer: string) {
    this.$input_customerPassportIssuer.scrollIntoView();
    this.$input_customerPassportIssuer.waitForClickable();
    this.$input_customerPassportIssuer.click();
    this.$input_customerPassportIssuer.clearValue();
    browser.pause(250);
    this.$input_customerPassportIssuer.setValue(passportIssuer);
    let suggestResult = $(`//li[contains(@data-value,'${passportIssuer}')]`);
    // let suggestResult = FindElementByText(passportIssuer);
    suggestResult.waitForDisplayed({ timeout: 5000 });
    suggestResult.waitForClickable();
    suggestResult.click();
  }
  /**
   * Функция ввода номера отчёта
   *
   * @param copyAgreementNum - копировать номер Договора? (`boolean`)
   * @param reportNumber - номер отчёта (`string`)
   */
  setReportNumber(copyAgreementNum: boolean, reportNumber: string) {
    if (copyAgreementNum === true) {
      this.setAgreementNumber(reportNumber);
      this.$button_copyAgreementNumberToReportNumber.scrollIntoView();
      this.$button_copyAgreementNumberToReportNumber.waitForClickable();
      this.$button_copyAgreementNumberToReportNumber.click();
      browser.waitUntil(
        () => this.residentialReportBase.$text_reportNumber.match(reportNumber) !== null
      );
    } else {
      this.$input_reportNumber.scrollIntoView();
      this.$input_reportNumber.waitForClickable();
      this.$input_reportNumber.setValue(reportNumber);
      this.residentialReportBase.$base_reportActionButtons.scrollIntoView();
      browser.waitUntil(
        () => this.residentialReportBase.$text_reportNumber.match(reportNumber) !== null
      );
    }
  }

  selectPrintForm(printForm: BaReportResidentialPrintForm) {
    this.$selector_printForm.scrollIntoView();
    this.$selector_printForm.waitForClickable();
    this.$selector_printForm.selectByAttribute("value", printForm);
  }
  selectMarketResearch(marketResearchName: string) {
    this.$selector_marketResearch.scrollIntoView();
    this.$selector_marketResearch.waitForClickable();
    this.$selector_marketResearch.selectByVisibleText(marketResearchName);
  }
  selectWearoutAlgorithm(wearoutAlgoritm: BaReportResidentialWearoutAlgorithm) {
    this.$selector_wearoutAlgorithm.scrollIntoView();
    this.$selector_wearoutAlgorithm.waitForClickable();
    this.$selector_wearoutAlgorithm.selectByAttribute("value", wearoutAlgoritm);
  }
  selectCalculationAlgorithm(calcAlgorithm: BaReportResidentialCalculationAlgorithm) {
    this.$selector_calculationAlgorithm.scrollIntoView();
    this.$selector_calculationAlgorithm.waitForClickable();
    this.$selector_calculationAlgorithm.selectByAttribute("value", calcAlgorithm);
  }
  selectSpaceToChoose(spaceToChoose: BaReportResidentialSpaceToChoose) {
    this.$selector_whatSpaceToChoose.scrollIntoView();
    this.$selector_whatSpaceToChoose.waitForClickable();
    this.$selector_whatSpaceToChoose.selectByAttribute("value", spaceToChoose);
  }
  selectMapType(mapType: BaReportResidentialMapType) {
    this.$selector_mapType.scrollIntoView();
    this.$selector_mapType.waitForClickable();
    this.$selector_mapType.selectByAttribute("value", mapType);
  }
  selectRoundValue(roundValueVariant: BaReportResidentialRoundValueVariants) {
    this.$selector_roundValueVariants.scrollIntoView();
    this.$selector_roundValueVariants.waitForClickable();
    this.$selector_roundValueVariants.selectByAttribute("value", roundValueVariant);
  }
  /**
   * Функция заполнения поля "Вид объекта оценки"
   *
   * @param objectType
   */
  selectObjectType(objectType: BaResidentialObjectType) {
    this.$selector_objectType.scrollIntoView();
    this.$selector_objectType.waitForClickable();
    this.$selector_objectType.selectByAttribute("value", objectType);
  }
  /**
   * Функция выбора стадии строительства
   *
   * @param buildingStage
   */
  selectObjectBuildingStage(buildingStage: BuildingStage) {
    this.$selector_buildingStage.scrollIntoView();
    this.$selector_objectType.waitForClickable();
    this.$selector_buildingStage.selectByAttribute("value", buildingStage);
  }
  /**
   * Функция работы с аттрибутом "Объект оценки является таунхаусом"
   *
   * @param data
   */
  selectObjectIsTownhouseAttr(data: BaResidentialIsTownhouse) {
    this.$selector_isTownhouse.scrollIntoView();
    this.$selector_objectType.waitForClickable();
    this.$selector_isTownhouse.selectByIndex(data);
  }
  /**
   * Функция выбора значения поля "Указать в очтёте стоимость"
   *
   * @param valuationPart
   */
  selectObjectValuationPart(valuationPart: BaResidentialValuationPart) {
    this.$selector_objectSharePart.scrollIntoView();
    this.$selector_objectType.waitForClickable();
    this.$selector_objectSharePart.selectByAttribute("value", valuationPart);
  }
  /**
   *
   * @param ownership
   */
  selectRegisteredOwnership(ownership: BaResidentialOwnership) {
    this.$selector_registeredOwnership.scrollIntoView();
    this.$selector_objectType.waitForClickable();
    this.$selector_registeredOwnership.selectByAttribute("value", ownership);
  }

  setBankUser(userOrOfficeName: string) {
    let suggestedUser: WebdriverIO.Element;

    this.$input_bankUser.waitForExist();
    this.$input_bankUser.scrollIntoView();
    this.$input_bankUser.waitForEnabled();
    this.$input_bankUser.setValue(userOrOfficeName);
    suggestedUser = FindElementByText(userOrOfficeName);
    suggestedUser.waitForExist();
    suggestedUser.waitForDisplayed({ timeout: 1000, reverse: false });
    suggestedUser.click();
    suggestedUser.waitForDisplayed({ timeout: 1000, reverse: true });
  }
  /**
   * Функция проставления даты оценки
   *
   * @param appraisalDate
   */
  setReportDetailsAppraisalDate(appraisalDate?: string) {
    this.$input_customerPassportDate.scrollIntoView();
    this.$input_customerPassportDate.waitForClickable();
    if (appraisalDate) {
      this.$input_customerPassportDate.click();
      this.$input_customerPassportDate.setValue(appraisalDate);
      browser.keys("Tab");
    } else {
      this.$input_customerPassportDate.click();
      browser.keys(["f", "Tab"]);
    }
  }
  setReportDetailsInspectionDate(inspectionDate?: string) {
    this.$input_customerPassportDate.scrollIntoView();
    this.$input_customerPassportDate.waitForClickable();
    if (inspectionDate) {
      this.$input_customerPassportDate.click();
      this.$input_customerPassportDate.setValue(inspectionDate);
      browser.keys("Tab");
    } else {
      this.$input_customerPassportDate.click();
      browser.keys(["f", "Tab"]);
    }
  }
  setReportDetailsReportComposeDate(reportComposeDate?: string) {
    this.$input_customerPassportDate.scrollIntoView();
    this.$input_customerPassportDate.waitForClickable();
    if (reportComposeDate) {
      this.$input_customerPassportDate.click();
      this.$input_customerPassportDate.setValue(reportComposeDate);
      browser.keys("Tab");
    } else {
      this.$input_customerPassportDate.click();
      browser.keys(["f", "Tab"]);
    }
  }
  // ---------------------------------------------------------------------------------------------
  /**
   * Функция заполнения блока `Договор на оценку`
   *
   * @param agreementNumber - номер отчёта
   */
  setBlockData_AppraisalContract(
    agreementNumber: string,
    appraisalPurpose: string,
    intendedUse: BaResidentialIntendedUse,
    appraisalOwnership: string,
    encumbrances: string,
    agreementDate?: string
  ) {
    this.setReportNumber(true, agreementNumber);
    agreementDate ? this.setAgreementDate(agreementDate) : this.setAgreementDate();
    this.setAppraisalPurpose(appraisalPurpose);
    this.setIntentedUse(intendedUse);
    this.setAppraisalOwnership(appraisalOwnership);
    this.setEncumbrances(encumbrances);
  }
  /**
   * Функция заполнения блока `Сведения о заказчике`
   *
   * @param customerFullName
   * @param customerAddress
   * @param customerPassportSerial
   * @param customerPassportNumber
   * @param customerPassportDate
   * @param customerPassportIssuer
   */
  setBlockData_CustomerInfo(
    customerFullName: string,
    customerAddress: string,
    customerPassportSerial: string,
    customerPassportNumber: string,
    customerPassportDate: string,
    customerPassportIssuer: string
  ) {
    this.setCustomerFullName(customerFullName);
    this.setCustomerAddress(customerAddress);
    this.setCustomerPassportSerial(customerPassportSerial);
    this.setCustomerPassportNumber(customerPassportNumber);
    this.setCustomerPassportDate(customerPassportDate);
    this.setCustomerPassportIssuer(customerPassportIssuer);
  }
  /**
   * Функция запонения блока `Тип Объекта оценки`
   *
   * @param objType
   * @param buildStage
   * @param isTownhouse
   * @param valPart
   */
  setBlockData_valuationObjectType(
    objType: BaResidentialObjectType,
    buildStage: BuildingStage,
    isTownhouse: BaResidentialIsTownhouse,
    valPart: BaResidentialValuationPart,
    currentUse: string
  ) {
    this.selectObjectType(objType);
    this.selectObjectBuildingStage(buildStage);
    this.selectObjectIsTownhouseAttr(isTownhouse);
    this.selectObjectValuationPart(valPart);
    this.$input_currentUse.scrollIntoView();
    this.$input_currentUse.waitForClickable();
    this.$input_currentUse.setValue(currentUse);
  }

  setBlockData_appraisalObjectAddress(address?: string, cadastrNum?: string) {
    let workingAddress: string = address
      ? address
      : TestDataBa.ResidentialReport.default.AssesmentTask.AppraisalObjectAddress.address;

    this.$input_fiasAddress.waitForExist();
    this.$input_fiasAddress.scrollIntoView();
    this.$input_fiasAddress.waitForDisplayed({});
    this.$input_fiasAddress.waitForClickable();
    this.$input_fiasAddress.click();
    this.$input_fiasAddress.setValue(workingAddress);

    let suggestedAddress = $(`//ul[@role='listbox']//a`);
    suggestedAddress.waitForExist();
    suggestedAddress.scrollIntoView();
    suggestedAddress.waitForClickable();
    suggestedAddress.click();

    browser.waitUntil(
      () =>
        this.$input_fiasAddress.getText() !== null &&
        this.$input_region.getText() !== null &&
        this.$input_city.getText() !== null &&
        this.$input_street.getText() !== null,
      { timeout: 3000, timeoutMsg: "Адрес не был выбран" }
    );
    this.$input_addressDoc.scrollIntoView();
    this.$input_addressDoc.waitForClickable();
    this.$input_addressDoc.setValue(workingAddress);

    if (cadastrNum) {
      this.$input_cadastralNumber.scrollIntoView();
      this.$input_cadastralNumber.waitForClickable();
      this.$input_cadastralNumber.setValue(cadastrNum);
    }
  }
  /**
   * Функция полного заполнения блока `Банк и форма отчёта`
   *
   * @param borrowerName если этот параметр отсуствует то будет скопировано \ФИО заказчика\
   * @param printForm
   * @param marketResearchName
   * @param wearoutAlgoritm
   * @param calcAlgorithm
   * @param spaceToChoose
   * @param mapType
   * @param roundValueVariant
   */
  setBlockData_bankAndReportForm(
    printForm: BaReportResidentialPrintForm,
    marketResearchName: string,
    wearoutAlgoritm: BaReportResidentialWearoutAlgorithm,
    calcAlgorithm: BaReportResidentialCalculationAlgorithm,
    spaceToChoose: BaReportResidentialSpaceToChoose,
    mapType: BaReportResidentialMapType,
    roundValueVariant: BaReportResidentialRoundValueVariants,
    borrowerName?: string
  ) {
    if (!borrowerName) {
      this.$button_copyCustomerToBorrower.scrollIntoView();
      this.$button_copyCustomerToBorrower.waitForClickable();
      this.$button_copyCustomerToBorrower.click();
    } else {
      this.$input_borrowerName.scrollIntoView();
      this.$input_borrowerName.waitForClickable();
      this.$input_borrowerName.setValue(borrowerName);
    }
    this.selectPrintForm(printForm);
    this.selectMarketResearch(marketResearchName);
    this.selectWearoutAlgorithm(wearoutAlgoritm);
    this.selectCalculationAlgorithm(calcAlgorithm);
    this.selectSpaceToChoose(spaceToChoose);
    this.selectRoundValue(roundValueVariant);
    this.selectMapType(mapType);
  }
  setBlockData_reportDetails(
    copyAgrDate: boolean,
    useDollarPrice: boolean,
    appraisalDate?: string,
    inspectionDate?: string,
    composeDate?: string
  ) {
    if (copyAgrDate) {
      this.$button_copyDate.scrollIntoView();
      this.$button_copyDate.waitForClickable();
      this.$button_copyDate.click();
    } else {
      this.setReportDetailsAppraisalDate(appraisalDate);
      this.setReportDetailsInspectionDate(inspectionDate);
      this.setReportDetailsReportComposeDate(composeDate);
    }
    if (useDollarPrice) {
      if (this.$input_dollarRate.isEnabled()) this.$input_dollarRate.setValue("60");
      else {
        this.$checkbox_includeDollarPrice.scrollIntoView();
        this.$checkbox_includeDollarPrice.waitForClickable();
        this.$checkbox_includeDollarPrice.click();
        this.$input_dollarRate.waitForEnabled();
        this.$input_dollarRate.setValue("65");
      }
    } else {
      this.$checkbox_includeDollarPrice.scrollIntoView();
      this.$checkbox_includeDollarPrice.waitForClickable();
      this.$checkbox_includeDollarPrice.click();
      browser.waitUntil(() => browser.$(`input#dollarRate`).isEnabled() === false);
    }
  }
  waitForLoad() {
    browser.waitUntil(
      () =>
        browser.$(`//*[@id="report-nav-bar"]//a[@href="#tab1"]/..`).getAttribute("class") ===
        "active"
    );
  }
}
