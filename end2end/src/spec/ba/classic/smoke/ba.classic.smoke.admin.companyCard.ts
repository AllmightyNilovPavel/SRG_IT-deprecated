import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { baLoginPage, baMainPage, baClassicAdminCompanyData } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";
import { expect } from "chai";

describe(`BA. CLASSIC. SMOKE. Админка. Проверка карточки компании.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: testTitle,
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
  it(`Открыть карточку тестовой компании`, function () {
    allureReporter.generateReport();
    let testCompanyId = 1500020257261;

    baClassicAdminCompanyData.openCompanyCard(TestDataBa.Companies.Zarnitsa);
    baClassicAdminCompanyData.waitForLoad();
    expect(browser.getUrl()).to.include(testCompanyId);

    makeScreenshot(screenshotName);
  });
});
