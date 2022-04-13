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
  kronaResultTable,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Реестр ВТБ ИМ. `, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону под SRG`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.vtb_im,
      TestDataKrona.Users.password.srg.vtb_im
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в реестр ВТБ ИМ`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_VTB_IM);
    kronaResultTable.waitForLoad();
  });
  it(`Проверка реестра`, function () {
    allureReporter.generateReport();
    let data = kronaResultTable.$result_table_allData;
    expect(data).to.be.not.null;
  });
});
