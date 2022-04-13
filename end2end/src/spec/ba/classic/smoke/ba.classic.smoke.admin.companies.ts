import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  baLoginPage,
  baMainPage,
  baClassicNavMenu,
  BaNavigationButtons,
  baClassicAdminRegistryCompanies,
} from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";
import { expect } from "chai";

describe(`BA. CLASSIC. SMOKE. Админка. Проверка реестра компаний.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
    additionalArguments: [
      { argName: "Дата запуска", argValue: new Date().toDateString() },
      { argName: "111", argValue: "asdfg" },
    ],
  });
  it(`Логин в БО`, function () {
    allureReporter.generateReport();
    baLoginPage.open();
    baLoginPage.waitForLoad();
    expect(baLoginPage.$input_login.isExisting()).to.be.true;
    expect(baLoginPage.$input_password.isExisting()).to.be.true;

    baLoginPage.login(
      TestDataBa.Users.login.srg.autotest_superadmin,
      TestDataBa.Users.password.srg.autotest_superadmin
    );
    baMainPage.waitForLoad();
  });
  it(`Переходим в реестр компаний`, function () {
    allureReporter.generateReport();
    baClassicNavMenu.navigateTo(BaNavigationButtons.ADMIN_SETTINGS);
    baClassicAdminRegistryCompanies.waitForLoad();
    expect(baClassicAdminRegistryCompanies.$companiesTable_searchByTitle.isClickable()).to.be.true;
    makeScreenshot(screenshotName);
  });
});
