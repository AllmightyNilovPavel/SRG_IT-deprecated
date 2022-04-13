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
  RealtyType,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";
import { kronaSelhozRequestsCreation } from "pages/Krona/Requests/Banks/selhoz";
import { KronaTestDataSelhoz } from "options/testData/krona/testData/banks/selhoz";

describe(`КРОНА. SELHOZ. ДРПА. Реестр объектов. АПАРТАМЕНТЫ. Новый запрос на оценку.`, function () {
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
    // expect(browser.getUrl()).to.include(`request/flat/new`);
    kronaSelhozRequestsCreation.fullfillSelhozRequest(
      RealtyType.APARTMENT,
      KronaTestDataSelhoz.REQUEST
    );
    this.retries(3);
  });
  it(`Заполнение полей по проблемным активам`, function () {
    allureReporter.generateReport();
    let target: WebdriverIO.Element;
    // доступ в помещение
    target = $(`#propertyAccess`);
    expect(target.isExisting()).to.be.false;
    // цель проводимой оценки
    target = $(`#valuationPurpose`);
    expect(target.isExisting()).to.be.false;
    // наличие имущества
    target = $(`#thirdPartyBurdening`);
    expect(target.isExisting()).to.be.false;
    // срок экспозиции
    target = $(`#exposition`);
    expect(target.isExisting()).to.be.false;
    target = requestsCreateFlat.$input_customField1;
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
