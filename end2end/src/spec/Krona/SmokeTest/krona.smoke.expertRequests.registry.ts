import { expect } from "chai";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaExpertRequestsRegistry,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Реестр заявок эксперта.`, function () {
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
      TestDataKrona.Users.login.srg.expert_requests,
      TestDataKrona.Users.password.srg.expert_requests
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в Реестр ЗАЯВОК`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_REQUESTS_EXPERT);
    kronaExpertRequestsRegistry.waitForLoad();
  });
  it(`Проверка реестра`, function () {
    allureReporter.generateReport();
    let data = kronaExpertRequestsRegistry.$expertRequestsTable_allData;

    expect(data).to.be.not.null;
    makeScreenshot("SMOKE_РеестрЗаявокЭксперта_OK");
  });
});
