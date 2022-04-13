import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  KronaDataType,
  kronaDpaUziDecision,
  KronaEnumDpaUziDecision,
  kronaExpertRequestCard,
  KronaExpertResponseComparableFieldNames,
  kronaFiltersBox,
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaRequestCard,
  KronaResidentialReportStatusesTranslated,
  kronaResultTable,
  requestsCreateFlat,
  ValuationResultData,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { getIdFromUrl, makeScreenshot } from "modules";
import { KronaTestDataOpenbankRequests } from "options/testData/krona/testData/banks/openbank/requests/krona.testData.openbank.requests";

describe(`КРОНА. ОТКРЫТИЕ. Маршрутка. ДПА. Кейс №3.`, function () {
  let requestId: string = "";
  const TestData = KronaTestDataOpenbankRequests.FLAT_4;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
    issueId: "WEB-33868",
  });
  it(`Логин в Крону`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.openbank.autotest_DPA,
      TestDataKrona.Users.password.openbank.autotest_DPA
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход на страницу создания нового ЗАПРОСА`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.NEW_REQUEST);
    requestsCreateFlat.waitForLoad();
  });
  it(`Заполнить форму`, function () {
    allureReporter.generateReport({
      description: `Данные объекта оценки:
      ${JSON.stringify(TestData, void 0, 2)}`,
    });
    browser.refresh();
    requestsCreateFlat.waitForLoad();
    requestsCreateFlat.fullfillFlatRequest(TestData);
  });
  it(`Отправить запрос и ждать ответ`, function () {
    allureReporter.generateReport({
      additionalArguments: [
        {
          argName: "Номер кредитной заявки",
          argValue: `${TestData.custom1}`,
        },
      ],
      description: `Статус запроса должен быть `,
    });
    let valuationCheck: string | null;

    requestsCreateFlat.$button_buttonSend.click();
    valuationCheck = requestsCreateFlat.waitForResult(ValuationResultData.STATUS);

    let errorMsg =
      "Таблица с результатом расчёта не появилась. Увеличте таймаут либо проверьте корректность условия.";
    expect(valuationCheck, errorMsg).to.be.not.null;
    errorMsg = `Статус после проверки робота не соответствует ${KronaResidentialReportStatusesTranslated.AWAITS_EXPERT_VALUATION}.`;
    expect(valuationCheck).to.include(
      KronaResidentialReportStatusesTranslated.AWAITS_EXPERT_VALUATION
    );

    makeScreenshot("status_check");
  });
  it(`Находим объект в реестре`, function () {
    allureReporter.generateReport({ description: `` });
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REQUESTS_OLD);
    kronaFiltersBox.waitForLoad();
    kronaFiltersBox.inputCustomField(TestData.custom1, 1);

    kronaFiltersBox.showResults();
    kronaResultTable.waitForLoad();
    let request = kronaResultTable.resultTableGetData(KronaDataType.REQUEST);

    request.waitForClickable();
    request.click();
    kronaRequestCard.waitForLoad();
    requestId = getIdFromUrl();
  });
  it(`Перезаходим под суперадмином`, function () {
    allureReporter.generateReport({ description: `` });
    kronaNavigationBar.logout();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Оцениваем запрос`, function () {
    allureReporter.generateReport({
      description: `
      * Находим запрос в реестре объектов
      * Переходим в карточку расчёта эксперта
      * Оцениваем запрос в интервале [-15%, 15%]`,
    });
    kronaExpertRequestCard.goToExpertRequestCard(requestId);
    kronaExpertRequestCard.waitForLoad(false);
    kronaExpertRequestCard.setExecutorToCurrentUser();
    kronaExpertRequestCard.saveResponseDraft();
    kronaExpertRequestCard.checkDoubles();
    kronaExpertRequestCard.checkHouseHistory();
    kronaExpertRequestCard.saveResponseDraft();
    kronaExpertRequestCard.fillDataFromAnotherRequest("282333");
    kronaExpertRequestCard.saveResponseDraft();
    kronaExpertRequestCard.checkDoubles();
    kronaExpertRequestCard.checkHouseHistory();
    kronaExpertRequestCard.saveResponseDraft();
    kronaExpertRequestCard.commitJuniorAnalystResponse();
    kronaExpertRequestCard.confirmationBySenior();
  });
  it(`Проверяем статус`, function () {
    allureReporter.generateReport({ description: `` });
    kronaRequestCard.goToRequestCard(requestId);
    let requestStatus: string = kronaRequestCard.$info_requestStatus.getText();
    expect(requestStatus).to.include(
      KronaResidentialReportStatusesTranslated.BANK_SELF_EXPERT_VERIFICATION
    );
    makeScreenshot("check status after expert verification");
  });
  it(`Перезаходим под сотрудником банка`, function () {
    allureReporter.generateReport({ description: `` });
    kronaNavigationBar.logout();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.openbank.autotest_MANAGER,
      TestDataKrona.Users.password.openbank.autotest_MANAGER
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Принимаем решение`, function () {
    allureReporter.generateReport({ description: `` });
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REQUESTS_OLD);
    kronaFiltersBox.waitForLoad();
    kronaFiltersBox.inputCustomField(TestData.custom1, 1);

    kronaFiltersBox.showResults();
    kronaResultTable.waitForLoad();
    kronaResultTable.resultTableGetData(KronaDataType.REQUEST).waitForDisplayed();

    kronaDpaUziDecision.waitForLoad();
    kronaDpaUziDecision.makeUziDecision(KronaEnumDpaUziDecision.ACCEPT);
    kronaRequestCard.goToRequestCard(requestId);
    let requestStatus: string = kronaRequestCard.$info_requestStatus.getText();
    expect(requestStatus).to.be.equal(KronaResidentialReportStatusesTranslated.OVERVALUATION);
    makeScreenshot("check status after expert verification");
  });
});
