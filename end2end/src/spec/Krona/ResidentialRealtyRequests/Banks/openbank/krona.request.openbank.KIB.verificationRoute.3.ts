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

describe(`КРОНА. ОТКРЫТИЕ. Маршрутка. КИБ. Кейс №3.`, function () {
  let requestId: string = "";
  const TestData = KronaTestDataOpenbankRequests.FLAT_2;

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
      TestDataKrona.Users.login.openbank.autotest_KIB,
      TestDataKrona.Users.password.openbank.autotest_KIB
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
      ${JSON.stringify(TestData, void 2, 2)}`,
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
      * Оцениваем запрос дороже 30 млн (так мы точно) выйдем за границы`,
    });
    const verificationPrice = 30000000;

    kronaExpertRequestCard.goToExpertRequestCard(requestId);
    kronaExpertRequestCard.waitForLoad(false);
    kronaExpertRequestCard.setExecutorToCurrentUser();
    kronaExpertRequestCard.saveResponseDraft();
    kronaExpertRequestCard.checkDoubles();
    kronaExpertRequestCard.checkHouseHistory();
    kronaExpertRequestCard.fillDataFromAnotherRequest("282333");
    kronaExpertRequestCard.saveResponseDraft();
    for (let i = 1; i < 4; i++) {
      kronaExpertRequestCard
        .comparables(i, KronaExpertResponseComparableFieldNames.PRICE)
        .setValue(verificationPrice);
      kronaExpertRequestCard
        .comparables(i, KronaExpertResponseComparableFieldNames.TOTAL_SPACE)
        .setValue(TestData.total_space);
      kronaExpertRequestCard
        .comparables(i, KronaExpertResponseComparableFieldNames.REPAIRS_TYPE)
        .selectByIndex(TestData.flatRepairs_index);
    }
    kronaExpertRequestCard.saveResponseDraft();
    kronaExpertRequestCard.commitJuniorAnalystResponse();
    kronaExpertRequestCard.confirmationBySenior();
  });
  it(`Проверяем статус`, function () {
    allureReporter.generateReport({
      description: `Так как объект оценён более чем 
    на 30 млн по МСК то он должен попасть на верификацию банка`,
    });
    kronaRequestCard.goToRequestCard(requestId);

    let requestStatus: string = kronaRequestCard.$info_requestStatus.getText();
    expect(requestStatus).to.include(
      KronaResidentialReportStatusesTranslated.BANK_SELF_EXPERT_VERIFICATION
    );
    makeScreenshot("check status after expert verification");
  });
  it(`Перезаходим под МЕНЕДЖЕРОМ банка`, function () {
    allureReporter.generateReport({
      description: `Перезаходим под менеджером банка
    для того чтобы произвести верификацию`,
    });
    kronaNavigationBar.logout();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.openbank.autotest_MANAGER,
      TestDataKrona.Users.password.openbank.autotest_MANAGER
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Принимаем ПОЛОЖИТЕЛЬНОЕ решение`, function () {
    allureReporter.generateReport({
      description: `После принятия ПОЛОЖИТЕЛЬНОГО решения
    отчёт должен попасть в статус "скорректировано" потому что отклонение 
    "стоимости в отчёте" от "стоимости эксперта" больше 5%`,
    });

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
    expect(requestStatus).to.be.equal(
      KronaResidentialReportStatusesTranslated.ACCEPTED_EXPERT_VALUATION
    );
    makeScreenshot("check status after expert verification");
  });
});
