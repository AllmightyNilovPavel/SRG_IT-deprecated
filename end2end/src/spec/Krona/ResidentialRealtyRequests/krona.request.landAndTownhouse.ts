import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  kronaLoginPage,
  requestCreateLandAndTownhouse,
  kronaNavigationBar,
  KronaNavigationButtons,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. SRG. Реестр объектов. ТАУНХАУС С ЗЕМЕЛЬНЫМ УЧАСТКОМ. Новый запрос на оценку.`, function () {
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
    requestCreateLandAndTownhouse.waitForLoad();
  });
  it(`Заполнить форму`, function () {
    // this.runnable().retries(3)
    allureReporter.generateReport();
    requestCreateLandAndTownhouse.FullfillLandAndTownhouseRequest(
      TestDataKrona.Request.LandAndHouse
    );
  });
  it(`Отправить запрос`, function () {
    allureReporter.generateReport();
    requestCreateLandAndTownhouse.$button_buttonSend.scrollIntoView();
    requestCreateLandAndTownhouse.$button_buttonSend.click();

    browser.waitUntil(
      () => requestCreateLandAndTownhouse.$input_addressAutocomplete.isDisplayedInViewport(),
      { timeout: 50000, timeoutMsg: "Сообщение о некорректном кадастровом номере не появилось." }
    );

    let valuationCheck: string | null;

    requestCreateLandAndTownhouse.$button_buttonSend.scrollIntoView();
    requestCreateLandAndTownhouse.$button_buttonSend.waitForClickable();
    requestCreateLandAndTownhouse.$button_buttonSend.click();
    valuationCheck = requestCreateLandAndTownhouse.waitForResult();

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
