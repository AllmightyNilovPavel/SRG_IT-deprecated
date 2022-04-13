import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  KronaDataType,
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

describe(`КРОНА. ОТКРЫТИЕ. Маршрутка. КИБ. Кейс №2.`, function () {
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
  it(`Создание нового ЗАПРОСА на оценку`, function () {
    // allureReporter.generateReport();
    allureReporter.generateReport({
      description: `
      * Переходим на страницу создания нового запроса на оценку
      * Заполняем форму данными объекта оценки:
      ${JSON.stringify(TestData, void 2, 2)}`,
    });
    kronaNavigationBar.navigate_to(KronaNavigationButtons.NEW_REQUEST);
    requestsCreateFlat.waitForLoad();

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
      description: `Статус запроса должен быть "ОКОНЧАНИЕ ВЕРИФИКАЦИИ ..."`,
    });

    requestsCreateFlat.$button_buttonSend.click();
    let valuationCheck = requestsCreateFlat.waitForResult(ValuationResultData.STATUS);

    let errorMsg: string = `Таблица с результатом расчёта не появилась.
      Увеличте таймаут либо проверьте корректность условия.`;
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
      * Оцениваем запрос в интервале [-15%, 15%]
      * Сохраняем оценку`,
    });
    kronaExpertRequestCard.goToExpertRequestCard(requestId);
    kronaExpertRequestCard.waitForLoad(false);
    kronaExpertRequestCard.setExecutorToCurrentUser();
    kronaExpertRequestCard.saveResponseDraft();
    kronaExpertRequestCard.fillDataFromAnotherRequest("282333");
    kronaExpertRequestCard.checkDoubles();
    kronaExpertRequestCard.checkHouseHistory();
    kronaExpertRequestCard.saveResponseDraft();
    for (let i = 1; i < 4; i++) {
      kronaExpertRequestCard
        .comparables(i, KronaExpertResponseComparableFieldNames.PRICE)
        .setValue(TestData.price);
      kronaExpertRequestCard
        .comparables(i, KronaExpertResponseComparableFieldNames.TOTAL_SPACE)
        .setValue(TestData.total_space);
      kronaExpertRequestCard
        .comparables(i, KronaExpertResponseComparableFieldNames.REPAIRS_TYPE)
        .selectByIndex(TestData.flatRepairs_index);
    }
    kronaExpertRequestCard.checkDoubles();
    kronaExpertRequestCard.checkHouseHistory();
    kronaExpertRequestCard.saveResponseDraft();
  });
  it(`Подтверждение оценки эксперта`, function () {
    allureReporter.generateReport({
      description: `Так как на предыдущем шаге мы
        заполнили все данные для расчёта то на этом шаге мы подтвеждаем расчёт.
        Вынесено в отдельный шаг во избежании ошибок при повторных попытках
        выполнения.`,
    });
    kronaExpertRequestCard.commitJuniorAnalystResponse();
    kronaExpertRequestCard.confirmationBySenior();
  });
  it(`Проверяем статус`, function () {
    allureReporter.generateReport({ description: `` });
    kronaRequestCard.goToRequestCard(requestId);
    let requestStatus: string = kronaRequestCard.$info_requestStatus.getText();
    expect(requestStatus).to.be.equal(
      KronaResidentialReportStatusesTranslated.ACCEPTED_EXPERT_VALUATION
    );
    makeScreenshot("check status after expert verification");
  });
});
