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
  requestsCreateNewApartment,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. SRG. Реестр объектов. АПАРТАМЕНТЫ НОВОСТРОЙКА. Новый запрос на оценку.`, function () {
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
  it(`Открыть страницу создания нового ЗАПРОСА`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.NEW_REQUEST);
    requestsCreateNewApartment.waitForLoad();
    expect(requestsCreateNewApartment.$input_documentAddress.isExisting()).to.be.true;
  });
  it(`Заполнить форму`, function () {
    allureReporter.generateReport();
    requestsCreateNewApartment.FullfillNewApartmentRequest(TestDataKrona.Request.NewApartment);
    this.retries(3);
  });
  it(`Отправка запроса и ожидание ответа.`, function () {
    allureReporter.generateReport();
    let valuationCheck: string | null;

    requestsCreateNewApartment.$button_buttonSend.click();
    valuationCheck = requestsCreateNewApartment.waitForResult();

    expect(
      valuationCheck,
      "Таблица с результатом расчёта не появилась. Увеличте таймаут либо проверьте корректность условия."
    ).to.be.not.null;
    makeScreenshot("newFlatRequestCreationOK");
  });
});
