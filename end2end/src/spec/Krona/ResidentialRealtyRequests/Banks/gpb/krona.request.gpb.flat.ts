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

describe(`КРОНА. SRG. Реестр объектов. КВАРТИРА. Новый запрос на оценку.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в Крону`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login("autotest_gpb_baikal", "Qq123456~!");
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход на страницу создания нового ЗАПРОСА`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.NEW_REQUEST);
    requestsCreateFlat.waitForLoad();
    expect(requestsCreateFlat.$map.isExisting()).to.be.true;
  });
  it(`Заполнить форму`, function () {
    allureReporter.generateReport();
    let bankCreditNumber: string = `autotest_gpb request ${new Date().toISOString()}`;

    expect(browser.getUrl()).to.include(`request/flat/new`);
    requestsCreateFlat.fullfillFlatRequest(TestDataKrona.Request.Flat.GPB_TEST);
    requestsCreateFlat.inputCustomField(bankCreditNumber, 1);
  });
  it(`Отправить запрос и ждать ответ`, function () {
    allureReporter.generateReport();
    let valuationCheck: string | null;

    requestsCreateFlat.$button_buttonSend.click();
    valuationCheck = requestsCreateFlat.waitForResult(ValuationResultData.STATUS);

    expect(
      valuationCheck,
      "Таблица с результатом расчёта не появилась. Увеличте таймаут либо проверьте корректность условия."
    ).to.be.not.null;
  });
  // TODO: Сделать проверка на наличие запроса в реестре
  /*
  it(`Перейти в реестр запросов`, function() {
  allureReporter.generateReport();
   kronaNavigationBar.navigate_to(KronaNavigationButtons.REQUESTS_OLD);
    kronaResultTable.waitForLoad();
    makeScreenshot("КРОНА_Квартира_ЗапросНаОценку_Ок");
  }); */
});
