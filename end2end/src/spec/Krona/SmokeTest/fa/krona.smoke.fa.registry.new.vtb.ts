import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";

import {
  kronaLoginPage,
  kronaNavigationBar,
  KronaDataType,
  KronaNavigationButtons,
  kronaResultTableNew,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. VTB. Реестр Федерального Оценщика (НОВЫЙ).`, function () {
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
      TestDataKrona.Users.login.vtb.autotest_fa,
      TestDataKrona.Users.password.vtb.autotest_fa
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в реестр ФА - новый`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_FEDERAL_APPRAISER_PUBLIC);
    kronaResultTableNew.waitForLoad();
  });
  it(`Проверка реестра`, function () {
    allureReporter.generateReport();
    let result_check;
    result_check = kronaResultTableNew.resultTableGetData(KronaDataType.FA_PUBLIC);
    expect(result_check).to.be.not.null;
    makeScreenshot("KRONA_SMOKE_FA_VTB_NEW");
  });
});
