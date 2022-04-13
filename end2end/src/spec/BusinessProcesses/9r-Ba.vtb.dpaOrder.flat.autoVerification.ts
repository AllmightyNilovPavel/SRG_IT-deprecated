import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { getIdFromUrl } from "modules";
import {
  KronaEnumOrderDpaResidentialInspectionContacts,
  KronaOrderDpaResidentialDpaWork,
  KronaOrderDpaResidentialInspection,
  KronaOrderDpaResidentialIntendedUse,
} from "pages/Krona/DpaOrdersVtb/enums";

import { TestFilesEnum } from "test_files/enum.testFiles";
import {
  KronaDataType,
  kronaExpertRequestCard,
  KronaExpertResponseComparableFieldNames,
  kronaFiltersBox,
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaOrderDpaResidentialOrderPage,
  KronaResidentialReportStatusesTranslated,
  kronaResultTable,
} from "pages/Krona";
import {
  BaAnalogDataField,
  baClassicNavMenu,
  baDpaOrdersList,
  baLoginPage,
  baMainPage,
  BaNavigationButtons,
  BaQualifiedRepairState,
  BaReportNavigationPanels,
  BaResidentialSignType,
  residentialReportPage,
} from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";
import { expect } from "chai";

let orderId: string;
let reportNumber: string;

describe(`Интеграция Крона->БО. БЗО. Недвижимость. Заказ. Квартира. БЗО.Готово.`, function () {
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
  it(`Создание заказа`, function () {
    allureReporter.generateReport();
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.open();
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.waitForLoad();
    kronaOrderDpaResidentialOrderPage.SET_DATA.orderCompleteFill(
      KronaOrderDpaResidentialDpaWork.INDIVIDUAL,
      KronaOrderDpaResidentialIntendedUse.BANKRUPTCY,
      TestDataKrona.DpaOrder.ValuableObjectDescription,
      TestDataKrona.DpaOrder.CadastralNumber,
      TestDataKrona.DpaOrder.ObjectAddress,
      KronaOrderDpaResidentialInspection.YES,
      KronaOrderDpaResidentialInspection.YES,
      KronaEnumOrderDpaResidentialInspectionContacts.BANK,
      TestDataKrona.DpaOrder.InspectionContactFIO,
      TestDataKrona.DpaOrder.InspectionContactPhone,
      TestDataKrona.DpaOrder.InspectioncontactEmail,
      TestFilesEnum.JPG,
      TestFilesEnum.JPG,
      TestDataKrona.DpaOrder.Appraiser
    );
  });
  it(`Отправка заказа`, function () {
    allureReporter.generateReport();
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.saveOrderDraft();
    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.waitForLoad();
    console.log("Ссылка на тестовый заказ = ", browser.getUrl());

    orderId = getIdFromUrl();
    console.log("Айди закaза = ", orderId);

    kronaOrderDpaResidentialOrderPage.BASIC_ACTIONS.sendOrder();
  });
  it(`Логин в БО`, function () {
    allureReporter.generateReport();
    baLoginPage.open();
    baLoginPage.login(
      TestDataBa.Users.login.zarnitsa.admin,
      TestDataBa.Users.password.zarnitsa.admin
    );
    baMainPage.waitForLoad();
  });
  it(`Принятие заказа в БО`, function () {
    allureReporter.generateReport();
    baClassicNavMenu.navigateTo(BaNavigationButtons.DPA_ORDERS);
    baDpaOrdersList.waitForLoad();
    baDpaOrdersList.acceptOrder(orderId, "ВТБ");
    residentialReportPage.BasicActions.waitForLoad();
  });
  it(`Заполнение отчёта`, function () {
    allureReporter.generateReport();
    reportNumber = "VtbDpaOrder-" + orderId;

    // Автозаполнение
    residentialReportPage.BasicActions.autofillFromAnotherReport();
    residentialReportPage.AssesmentTaskActions.setReportNumber(true, reportNumber);
    // Исправление состояния отделки
    residentialReportPage.Navigation.navigateTo(BaReportNavigationPanels.ASSESMENT_OBJECT);
    residentialReportPage.AssesmentObjectActions.selectRepairState(BaQualifiedRepairState.GOOD);
    // Заполнение аналогов
    residentialReportPage.Navigation.navigateTo(BaReportNavigationPanels.ANALOGS);
    residentialReportPage.AnalogData.setAnalogTextData(1, "4000000", BaAnalogDataField.PRICE);
    residentialReportPage.AnalogData.setAnalogTextData(3, "4000000", BaAnalogDataField.PRICE);
    residentialReportPage.AnalogData.setAnalogTextData(2, "4000000", BaAnalogDataField.PRICE);
    residentialReportPage.BasicActions.saveReport();
    residentialReportPage.BasicActions.payReport();
    residentialReportPage.BasicActions.saveReport();
  });
  it(`Подпись и отправка в Крону`, function () {
    allureReporter.generateReport();
    residentialReportPage.BasicActions.signReport(
      BaResidentialSignType.PASSWORD,
      TestDataBa.Users.password.zarnitsa.admin
    );
  });
  it(`Перезаход в Крону под суперадмином`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Поиск отчёта`, function () {
    this.retries(5);

    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REPORTS_OLD);
    kronaResultTable.waitForLoad();
    browser.pause(60000);
    kronaFiltersBox.$input_reportNumber.waitForDisplayed({});
    kronaFiltersBox.$input_reportNumber.setValue(reportNumber);
    kronaFiltersBox.$button_showResults.waitForClickable();
    kronaFiltersBox.$button_showResults.click();
    // Это неявное ожидание нужно чтобы статус отчёта был нужным (Окончание верификации)
    browser.pause(10000);
    kronaFiltersBox.$button_showResults.click();
    browser.pause(5000);
    let reportButton = kronaResultTable.resultTableGetData(KronaDataType.EXPERT);
    if (reportButton.isDisplayed() === false) {
      kronaFiltersBox.$button_showResults.click();
      browser.pause(1000);
    }
    reportButton.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: `Отчёт ${reportNumber} не появился в реестре Кроны`,
    });
    reportButton.scrollIntoView();
    reportButton.waitForClickable();
    reportButton.click();
    kronaExpertRequestCard.waitForLoad(false);
  });
  it(`Оценка`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.setExecutorToCurrentUser();
    kronaExpertRequestCard.waitForLoad(true);
    kronaExpertRequestCard.checkDoubles();
    kronaExpertRequestCard.checkHouseHistory();
    kronaExpertRequestCard.fillDataFromAnotherRequest("251518");

    // Берём цену Объекта Оценки и ставим её всем аналогам чтобы получить нужный статус
    let appraisalObjectPrice: string = kronaExpertRequestCard.$info_objectPriceInReport.getText();
    for (let i = 1; i < 4; i++) {
      let target: WebdriverIO.Element = kronaExpertRequestCard.comparables(
        i,
        KronaExpertResponseComparableFieldNames.PRICE
      );
      target.setValue(appraisalObjectPrice);
      browser.pause(500);
    }
    kronaExpertRequestCard.commitExpertResponse();
  });
  it(`Возврат в реестр и повторный поиск отчёта`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.waitForLoad();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REPORTS_OLD);
    kronaResultTable.waitForLoad();
  });
  it(`Поиск тестового отчёта`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REPORTS_OLD);
    kronaResultTable.waitForLoad();
    kronaFiltersBox.$input_reportNumber.waitForDisplayed({});
    kronaFiltersBox.$input_reportNumber.setValue(reportNumber);
    kronaFiltersBox.$button_showResults.waitForClickable();
    kronaFiltersBox.$button_showResults.click();
    // Это неявное ожидание нужно чтобы статус отчёта был нужным (Окончание верификации)
    browser.pause(5000);
    kronaFiltersBox.$button_showResults.click();
  });
  it(`Проверка статуса`, function () {
    allureReporter.generateReport();
    let statusField = kronaResultTable.resultTableGetData(KronaDataType.REPORT_STATUS);
    statusField.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `Поле с информацией о статсе отчёта недоступно`,
    });
    expect(statusField.getText()).to.include(
      KronaResidentialReportStatusesTranslated.BANK_SELF_EXPERT_VERIFICATION
    );
  });
});
