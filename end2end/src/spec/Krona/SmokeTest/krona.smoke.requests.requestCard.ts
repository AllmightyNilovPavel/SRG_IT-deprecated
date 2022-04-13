import { expect } from "chai";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  KronaDataType,
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaRequestCard,
  kronaResultTable,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. Реестр Объектов.`, function () {
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
  it(`Открыть реестр объектов`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REQUESTS_OLD);
    kronaResultTable.waitForLoad();
    // makeScreenshot("SMOKE_РеестрОбъектов");
  });
  it(`Перейти в карточку`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.REQUEST).click();
    kronaNavigationBar.waitForLoad();
    kronaRequestCard.$requestCard_yandexMap.waitForDisplayed({ timeout: 20000, reverse: false });

    expect(kronaRequestCard.$table_requestSourceInfo.isDisplayed()).to.be.true;
    makeScreenshot("KRONA_SMOKE_REQUESTS_Карточка");
  });
});
