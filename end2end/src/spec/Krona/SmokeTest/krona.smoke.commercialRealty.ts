import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import options from "options";
import { kronaLoginPage, kronaNavigationBar, kronaResultTable, KronaDataType } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. Проверка реестра Коммерческая недвижимость.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Открыть реестр`, function () {
    allureReporter.generateReport();
    browser.url(options.krona.host + "/commercial/reports");
    kronaNavigationBar.waitForLoad();
    kronaResultTable.waitForLoad();
    browser.waitUntil(
      () => kronaResultTable.resultTableGetData(KronaDataType.COMMERCIAL).isDisplayed(),
      {
        timeout: 10000,
        timeoutMsg: `Данные реестра ${browser.getUrl()} не загрузились.`,
      }
    );
    expect(kronaResultTable.resultTableGetData(KronaDataType.COMMERCIAL).isDisplayed()).to.be.true;
    makeScreenshot("SMOKE_РеестрКН");
  });
});
