import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  requestsCreateFlat,
  ValuationResultData,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";
import { KronaTestDataOpenbankRequests } from "options/testData/krona/testData/banks/openbank/requests/krona.testData.openbank.requests";

describe.skip(`КРОНА. ОТКРЫТИЕ. Маршрутка. КИБ. Кейс №1.`, function () {
  const TestData = KronaTestDataOpenbankRequests.FLAT_1;

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
      ${JSON.stringify(TestData, void 0, 2)}`,
    });
    browser.refresh();
    requestsCreateFlat.waitForLoad();
    requestsCreateFlat.fullfillFlatRequest(TestData);
  });
  it(`Отправить запрос и ждать ответ`, function () {
    allureReporter.generateReport({
      additionalArguments: [{ argName: "Номер кредитной заявки", argValue: `${TestData.custom1}` }],
      description: ``,
    });
    let valuationCheck: string | null;

    requestsCreateFlat.$button_buttonSend.click();
    valuationCheck = requestsCreateFlat.waitForResult(ValuationResultData.STATUS);

    let errorMsg =
      "Таблица с результатом расчёта не появилась. Увеличте таймаут либо проверьте корректность условия.";
    expect(valuationCheck, errorMsg).to.be.not.null;
    errorMsg = "Статус после проверки робота не соответствует ОДОБРЕНО.";
    expect(valuationCheck).to.be.equal("Одобрено");

    makeScreenshot("status_check");
  });
});
