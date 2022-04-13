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

describe(`КРОНА. SELHOZ. ДРПА. Реестр объектов. КВАРТИРА. Новый запрос на оценку.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: testTitle,
  });
  it(`Логин в Крону`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.selhoz.drpa,
      TestDataKrona.Users.password.selhoz.drpa
    );
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
    expect(browser.getUrl()).to.include(`request/flat/new`);
    requestsCreateFlat.fullfillFlatRequest(TestDataKrona.Request.Flat.FOR_SELHOZ);
    this.retries(3);
  });
  it(`Заполнение дополнительных для Россельхоза полей`, function () {
    allureReporter.generateReport();
    let target = requestsCreateFlat.$input_customField1;
    target.setValue(TestDataKrona.Request.Flat.FOR_SELHOZ.customField1);
  });
  it(`Заполнение полей по проблемным активам`, function () {
    allureReporter.generateReport();
    let target: WebdriverIO.Element;
    // доступ в помещение
    target = $(`#propertyAccess`);
    target.selectByIndex(TestDataKrona.Request.Flat.FOR_SELHOZ.propertyAccess);
    expect(target.getValue()).to.be.not.null;
    // цель проводимой оценки
    target = $(`#valuationPurpose`);
    target.selectByIndex(TestDataKrona.Request.Flat.FOR_SELHOZ.valuationPurpose);
    expect(target.getValue()).to.be.not.null;
    // наличие имущества
    target = $(`#thirdPartyBurdening`);
    target.selectByIndex(TestDataKrona.Request.Flat.FOR_SELHOZ.thirdPartyBurdening);
    expect(target.getValue()).to.be.not.null;
    // срок экспозиции
    target = $(`#exposition`);
    target.selectByIndex(TestDataKrona.Request.Flat.FOR_SELHOZ.exposition);
    expect(target.getValue()).to.be.not.null;
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
    makeScreenshot(screenshotName);
  });
});
