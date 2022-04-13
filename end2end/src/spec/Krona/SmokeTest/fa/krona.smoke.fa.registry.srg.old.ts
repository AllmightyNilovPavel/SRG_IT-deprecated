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

describe.skip(`КРОНА. СМОК. SRG. Реестр Федерального Оценщика. Старый.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону под СУПЕРАДМИНОМ`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в реестр ФА - Старый`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.FA_ORDERS_OLD);
    kronaResultTable.waitForLoad();
  });
  it(`Проверка реестра`, function () {
    allureReporter.generateReport();
    let result_check;
    result_check = kronaResultTable.resultTableGetData(KronaDataType.FA);
    expect(result_check).to.be.not.null;
    makeScreenshot("KRONA_SMOKE_FA_SRG_OLD");
  });
});
