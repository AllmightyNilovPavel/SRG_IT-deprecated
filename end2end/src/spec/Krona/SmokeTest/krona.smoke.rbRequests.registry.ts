import { expect } from "chai";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  kronaLoginPage,
  kronaNavigationBar,
  kronaResultTable,
  KronaNavigationButtons,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Реестр расчётов`, function () {
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
      TestDataKrona.Users.login.srg.rbRequests,
      TestDataKrona.Users.password.srg.rbRequests
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в реестр расчётов (Байкала)`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_BAIKAL_REQUESTS);
    kronaResultTable.waitForLoad();
    let data = kronaResultTable.$result_table_allData;

    expect(data).to.be.not.null;
    makeScreenshot("SMOKE_РеестрБайкала_OK");
  });
});
