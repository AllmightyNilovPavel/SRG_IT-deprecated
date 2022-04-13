import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";

import { kronaLoginPage, kronaNavigationBar, options, kronaFaPublicOrder } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. VTB. Карточка заказа федерального оценщика.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону под ВТБ`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.vtb.autotest_fa,
      TestDataKrona.Users.password.vtb.autotest_fa
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в тестовую карточку заказа ФА`, function () {
    allureReporter.generateReport();
    browser.url(options.krona.host + TestDataKrona.FederalAppraiser.testPublicOrderCard);
    kronaFaPublicOrder.waitForLoad();
    expect(browser.getUrl()).to.include(kronaFaPublicOrder.path);
  });
});
