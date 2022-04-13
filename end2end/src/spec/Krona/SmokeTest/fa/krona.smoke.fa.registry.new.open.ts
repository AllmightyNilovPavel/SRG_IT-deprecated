import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";

import {
  kronaLoginPage,
  kronaNavigationBar,
  kronaResultTableNew,
  KronaDataType,
  KronaNavigationButtons,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. Открытие. Реестр Федерального Оценщика.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону под сотрудником Банка Открытие`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.openbank.autotest_MANAGER,
      TestDataKrona.Users.password.openbank.autotest_MANAGER
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в реестр ФА - React`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_FEDERAL_APPRAISER_PUBLIC);
    kronaResultTableNew.waitForLoad();
  });
  it(`Проверка реестра`, function () {
    allureReporter.generateReport();
    let result_check;
    result_check = kronaResultTableNew.resultTableGetData(KronaDataType.FA_PUBLIC);
    expect(result_check).to.be.not.null;
    makeScreenshot("KRONA_SMOKE_FA_OPEN_NEW");
  });
});
