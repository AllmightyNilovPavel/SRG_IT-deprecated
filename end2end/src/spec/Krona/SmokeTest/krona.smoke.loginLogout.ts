import { expect } from "chai";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { kronaLoginPage, kronaNavigationBar } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { debugLogging, makeScreenshot } from "modules";

describe(`КРОНА. СМОК. Простой вход/выход`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });

  it(`Открытие страницы логина`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    expect(kronaLoginPage.$checkbox_rememberMe.isDisplayed()).to.be.true;
    debugLogging(`Лог дебага ${browser.getUrl()}`);
  });
  it(`Логин без чекбокса`, function () {
    allureReporter.generateReport();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
    makeScreenshot("SuccessfulLogin");
  });
  it(`Выход`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.logout();
    kronaLoginPage.waitForLoad();
  });
  it(`Логин с чекбоксом`, function () {
    allureReporter.generateReport();
    kronaLoginPage.$checkbox_rememberMe.click();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Выход`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.logout();
    kronaLoginPage.waitForLoad();
    makeScreenshot("SuccessfulLogout");
  });
});
