import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";

import { kronaLoginPage, kronaNavigationBar, kronaFaOrder, options } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Карточка заказа федерального оценщика (НОВАЯ).`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону под СУПЕРАДМИНОМ`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в тестовую карточку заказа ФА`, function () {
    allureReporter.generateReport();
    browser.url(options.krona.host + TestDataKrona.FederalAppraiser.testOrderCardNew);
    kronaFaOrder.waitForLoad();
    expect(kronaFaOrder.$button_addNewComment.isClickable()).to.be.true;
  });
});
