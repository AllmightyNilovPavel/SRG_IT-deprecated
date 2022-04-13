import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import options from "options";
import {
  kronaLoginPage,
  kronaNavigationBar,
  kronaResultTable,
  KronaDataType,
  kronaCommercialPropertyReportCard,
} from "pages/Krona";
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
  });
  it(`Перейти в карточку`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.COMMERCIAL).click();
    console.log(browser.getUrl());
    browser.pause(1000);
    browser.switchWindow("commercial/report/");
    console.log(browser.getUrl());
    kronaCommercialPropertyReportCard.$commercialPropRep_summary.waitForDisplayed({
      timeout: 10000,
      reverse: false,
    });
    expect(browser.getUrl()).to.include(kronaCommercialPropertyReportCard.path);
    expect(kronaCommercialPropertyReportCard.$commercialPropRep_summary).to.be.not.empty;
    makeScreenshot("KRONA_SMOKE_КарточкаКН");
  });
});
