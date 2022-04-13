import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";

import options from "options";
import { loginPage } from "pages/ExpressSite/LoginPage";
import { navigationBar } from "pages/ExpressSite/NavigationBar";
import { makeScreenshot } from "pages/fa";

describe(`EXPRESS_SITE. SMOKE. Login-Logout`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvExpress,
    product: AllureReporterProducts.EXPRESS_SITE,
    story: this.title,
  });
  it(`Открытие страницы логина`, function () {
    allureReporter.generateReport();

    loginPage.open();
    expect(loginPage.$button_login.isDisplayed()).to.be.true;
  });
  it(`Заполнение формы и нажатие кнопки входа`, function () {
    allureReporter.generateReport();
    loginPage.login(options.ExpressSite.login_sber, options.ExpressSite.password_sber);
    navigationBar.waitForLoad();
    makeScreenshot("SuccessfulLogin");
  });
  it(`Выход`, function () {
    allureReporter.generateReport();
    navigationBar.logout();
    loginPage.waitForLoad();
  });
});
