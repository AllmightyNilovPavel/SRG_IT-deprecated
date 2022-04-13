import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  kronaLoginPage,
  kronaNavigationBar,
  kronaResultTable,
  KronaDataType,
  KronaNavigationButtons,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. Проверка реестра Жилые Дома`, function () {
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
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_COUNTRY_PROPERTY);
    kronaNavigationBar.waitForLoad();
    kronaResultTable.waitForLoad();
    browser.waitUntil(
      () => kronaResultTable.resultTableGetData(KronaDataType.COUNTRY_PROPERTY).isDisplayed(),
      {
        timeout: 10000,
        timeoutMsg: `Данные реестра ${browser.getUrl()} не загрузились.`,
      }
    );
    expect(kronaResultTable.resultTableGetData(KronaDataType.COUNTRY_PROPERTY).isDisplayed()).to.be
      .true;
    makeScreenshot("KRONA_SMOKE_ЖилыеДома_Реестр");
  });
});
