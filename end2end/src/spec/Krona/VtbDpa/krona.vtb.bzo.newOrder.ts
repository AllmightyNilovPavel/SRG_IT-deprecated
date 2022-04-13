import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { getIdFromUrl } from "modules";
import {
  KronaEnumOrderDpaResidentialInspectionContacts,
  KronaOrderDpaResidentialDataFields,
  KronaOrderDpaResidentialDocumentType,
  KronaOrderDpaResidentialDpaWork,
  KronaOrderDpaResidentialInspection,
  KronaOrderDpaResidentialIntendedUse,
  KronaOrderDpaResidentialObjectType,
} from "pages/Krona/DpaOrdersVtb/enums";

import { TestFilesEnum } from "test_files/enum.testFiles";
import {
  KronaDataType,
  kronaFiltersBox,
  kronaLoginPage,
  kronaNavigationBar,
  kronaOrderDpaResidentialOrderPage,
  kronaResultTable,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. ВТБ. ВЗО. Новый заказ. Квартира.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });

  it(`Логин в Крону`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.vtb.autotest_bzo,
      TestDataKrona.Users.password.vtb.autotest_bzo
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход на страницу нового заказа`, function () {
    allureReporter.generateReport();
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.open();
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.waitForLoad();
  });
  it(`Заполнение адреса`, () => {
    allureReporter.generateReport();
    let setPageData = kronaOrderDpaResidentialOrderPage.SET_DATA;

    setPageData.inputObjectAddress(TestDataKrona.DpaOrder.ObjectAddress);
    this.retries(3);
  });
  it(`Заполнение других полей формы`, function () {
    allureReporter.generateReport();
    let setPageData = kronaOrderDpaResidentialOrderPage.SET_DATA;
    let getPageData = kronaOrderDpaResidentialOrderPage.GET_DATA;

    expect(
      getPageData.getReportFieldData(KronaOrderDpaResidentialDataFields.OBJECT_TYPE)
    ).to.be.equal(KronaOrderDpaResidentialObjectType.FLAT);

    setPageData.selectDpaWork(KronaOrderDpaResidentialDpaWork.INDIVIDUAL);
    setPageData.selectIntendedUse(KronaOrderDpaResidentialIntendedUse.BALANCE);
    setPageData.inputValuableObjectDescription(TestDataKrona.DpaOrder.ValuableObjectDescription);
    setPageData.inputCadastralNumber(TestDataKrona.DpaOrder.CadastralNumber);
    setPageData.selectInternalInspection(KronaOrderDpaResidentialInspection.YES);
    setPageData.selectExternalInspection(KronaOrderDpaResidentialInspection.YES);
    setPageData.selectInspectionContacts(KronaEnumOrderDpaResidentialInspectionContacts.INDIVIDUAL);
    setPageData.inputInspectionContactFIO(TestDataKrona.DpaOrder.InspectionContactFIO);
    setPageData.inputInspectionContactPhone(TestDataKrona.DpaOrder.InspectionContactPhone);
    setPageData.inputInspectioncontactEmail(TestDataKrona.DpaOrder.InspectioncontactEmail);
    setPageData.uploadFile(TestFilesEnum.JPG, KronaOrderDpaResidentialDocumentType.ASSESMENT);
    setPageData.uploadFile(TestFilesEnum.JPG, KronaOrderDpaResidentialDocumentType.OWNERSHIP);
    setPageData.selectAppraiser(TestDataKrona.DpaOrder.Appraiser);
  });
  it(`Сохранение черновика`, function () {
    allureReporter.generateReport();
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.saveOrderDraft();
    console.log("Ссылка на тестовый заказ", browser.getUrl());
  });
  it(`Проверки заполненности полей`, function () {
    allureReporter.generateReport();
    let getPageData = kronaOrderDpaResidentialOrderPage.GET_DATA;

    expect(getPageData.getReportFieldData(KronaOrderDpaResidentialDataFields.DPA_WORK)).to.be.equal(
      KronaOrderDpaResidentialDpaWork.INDIVIDUAL
    );
    expect(
      getPageData.getReportFieldData(KronaOrderDpaResidentialDataFields.INTENDED_USE)
    ).to.be.equal(KronaOrderDpaResidentialIntendedUse.BALANCE);
    expect(
      getPageData.getReportFieldData(KronaOrderDpaResidentialDataFields.VALUABLE_OBJECT_DESCRIPTION)
    ).to.be.equal(TestDataKrona.DpaOrder.ValuableObjectDescription);
    expect(
      getPageData.getReportFieldData(KronaOrderDpaResidentialDataFields.CADASTRAL_NUMBER)
    ).to.be.equal(TestDataKrona.DpaOrder.CadastralNumber);
    expect(
      getPageData.getReportFieldData(KronaOrderDpaResidentialDataFields.OBJECT_ADDRESS)
    ).to.be.equal(TestDataKrona.DpaOrder.ObjectAddress);
    expect(
      getPageData.getReportFieldData(KronaOrderDpaResidentialDataFields.INTERNAL_INSPECTION)
    ).to.be.equal(KronaOrderDpaResidentialInspection.YES);
    expect(
      getPageData.getReportFieldData(KronaOrderDpaResidentialDataFields.EXTERNAL_INSPECTION)
    ).to.be.equal(KronaOrderDpaResidentialInspection.YES);
    expect(
      getPageData.getReportFieldData(KronaOrderDpaResidentialDataFields.INSPECTION_CONTACTS)
    ).to.be.equal(KronaEnumOrderDpaResidentialInspectionContacts.INDIVIDUAL);
    expect(
      getPageData.getReportFieldData(KronaOrderDpaResidentialDataFields.INSPECTION_CONTACT_FIO)
    ).to.be.equal(TestDataKrona.DpaOrder.InspectionContactFIO);
    expect(
      getPageData.getReportFieldData(KronaOrderDpaResidentialDataFields.INSPECTION_CONTACT_PHONE)
    ).to.be.equal(TestDataKrona.DpaOrder.InspectionContactPhone);
    expect(
      getPageData.getReportFieldData(KronaOrderDpaResidentialDataFields.INSPECTION_CONTACT_EMAIL)
    ).to.be.equal(TestDataKrona.DpaOrder.InspectioncontactEmail);
    expect(
      getPageData.getReportFieldData(KronaOrderDpaResidentialDataFields.APPRAISER)
    ).to.be.equal(TestDataKrona.DpaOrder.Appraiser);
  });
  it(`Отправка и Проверка статуса в реестре`, function () {
    allureReporter.generateReport();
    let orderNumber = getIdFromUrl();

    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.sendOrder();
    kronaResultTable.waitForLoad();

    let orderNumberFilter = $(`#filter_box input#orderNumber`);
    orderNumberFilter.scrollIntoView();
    orderNumberFilter.setValue(orderNumber);
    kronaFiltersBox.$button_filterReestr.scrollIntoView();
    kronaFiltersBox.$button_filterReestr.click();
    browser.pause(1000);
    // kronaResultTable.waitForLoad();

    expect(kronaResultTable.resultTableGetData(KronaDataType.BZO_STATUS).getText()).to.be.equal(
      "Отправлено"
    );
  });
});
