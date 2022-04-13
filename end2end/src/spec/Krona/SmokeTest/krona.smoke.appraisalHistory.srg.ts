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
  KronaDataType,
  appraisalHistory,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. История оценок. `, function () {
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
      TestDataKrona.Users.login.srg.appraisal_history,
      TestDataKrona.Users.password.srg.appraisal_history
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в реестр История Оценок`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.APPRAISAL_HISTORY);
    kronaResultTable.waitForLoad();
  });
  it(`Проверка реестра`, function () {
    allureReporter.generateReport();
    let data = kronaResultTable.$result_table_allData;
    expect(data).to.be.not.null;
  });
  it(`Переход в карточку`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.APPRAISAL_HISTORY).waitForClickable();
    kronaResultTable.resultTableGetData(KronaDataType.APPRAISAL_HISTORY).click();
    appraisalHistory.waitForLoad();
  });
});
