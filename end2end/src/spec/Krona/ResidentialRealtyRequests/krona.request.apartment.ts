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
  ValuationResultData,
  requestsCreateApartment,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. SRG. Реестр объектов. АПАРТАМЕНТЫ. Новый запрос на оценку.`, function () {
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
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход на страницу создания нового ЗАПРОСА`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.NEW_REQUEST);
    requestsCreateApartment.waitForLoad();
    // expect(requestsCreateApartment.$map.isExisting()).to.be.true;
  });
  it(`Заполнить форму`, function () {
    allureReporter.generateReport();
    expect(browser.getUrl()).to.include(requestsCreateApartment.path);
    requestsCreateApartment.FullfillApartmentRequest(TestDataKrona.Request.Apartment);
    this.retries(3);
  });
  it(`Отправить запрос и ждать ответ`, function () {
    allureReporter.generateReport();
    let valuationCheck: string | null;

    requestsCreateApartment.$button_buttonSend.click();
    valuationCheck = requestsCreateApartment.waitForResult(ValuationResultData.STATUS);

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
