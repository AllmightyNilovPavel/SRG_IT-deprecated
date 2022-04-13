import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  kronaLoginPage,
  requestCreateLandAndHouse,
  kronaNavigationBar,
  KronaNavigationButtons,
  requestCreateLand,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. SRG. Реестр объектов. ЗЕМЛЯ. Новый запрос на оценку.`, function () {
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
    requestCreateLand.waitForLoad();
  });
  it(`Заполнить форму`, function () {
    allureReporter.generateReport();
    requestCreateLand.FullfillLandRequest(TestDataKrona.Request.Land);
    this.retries(3);
  });
  it(`Отправить запрос`, function () {
    allureReporter.generateReport();
    requestCreateLand.$button_buttonSend.scrollIntoView();
    requestCreateLand.$button_buttonSend.waitForClickable();
    requestCreateLand.$button_buttonSend.click();

    browser.waitUntil(() => requestCreateLand.$input_addressAutocomplete.isDisplayedInViewport(), {
      timeout: 50000,
      timeoutMsg: "Сообщение о некорректном кадастровом номере не появилось.",
    });

    let valuationCheck: string | null;

    requestCreateLandAndHouse.$button_buttonSend.scrollIntoView();
    requestCreateLandAndHouse.$button_buttonSend.waitForClickable();
    requestCreateLandAndHouse.$button_buttonSend.click();
    valuationCheck = requestCreateLandAndHouse.waitForResult();

    expect(
      valuationCheck,
      "Таблица с результатом расчёта не появилась. Увеличте таймаут либо проверьте корректность условия."
    ).to.be.not.null;
  });
  /*   it(`Перейти в реестр объектов и сделать скриншот`, function() {
  allureReporter.generateReport();
   kronaNavigationBar.navigate_to(KronaNavigationButtons.REQUESTS_OLD);
    // kronaResultTable.waitForLoad();
    RequestsRegistryResultTable.waitForLoad();
    makeScreenshot("Запрос_ЗемляДом");
  }); */
});
