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
  KronaNavigationButtons,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Реестра ЕГРН.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(TestDataKrona.Users.login.srg.egrn, TestDataKrona.Users.password.srg.egrn);
    kronaNavigationBar.waitForLoad();
  });
  it(`Проверка реестр ЕГРН`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_EGRN);
    kronaResultTable.waitForLoad();
    let data = kronaResultTable.$result_table_allData;

    expect(data).to.be.not.null;
    makeScreenshot("SMOKE_РеестрЕГРН_OK");
  });
});
