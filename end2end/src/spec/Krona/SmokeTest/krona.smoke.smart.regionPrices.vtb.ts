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
  kronaSmartRegionPrices,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. VTB. SmartОценка. `, function () {
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
      TestDataKrona.Users.login.vtb.autotest_smartRegionsPrices,
      TestDataKrona.Users.password.vtb.autotest_smartRegionsPrices
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в реестр SmartОценка`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.SMART_REGION_PRICES);
    kronaSmartRegionPrices.waitForLoad();
  });
  it(`Проверка реестра`, function () {
    allureReporter.generateReport();
    let data = kronaSmartRegionPrices.$regionsTableWrapper_data;

    expect(data).to.be.not.null;
  });
});
