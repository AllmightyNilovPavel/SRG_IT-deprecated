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
  kronaReportCard,
  kronaReports,
  KronaDataType,
  KronaNavigationButtons,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Реестр отчётов. Карточка отчёта.`, function () {
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
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Открыть реестр Отчётов`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REPORTS_OLD);
    kronaResultTable.waitForLoad();
    // makeScreenshot("SMOKE_РеестрОтчётов");
  });
  it(`Отфильтровать по статусу "принято"`, function () {
    allureReporter.generateReport();
    kronaReports.$filter_Status.selectByAttribute("value", "ACCEPTED_AUTO_VALUATION");
    kronaReports.$button_showResult.click();
    kronaResultTable.waitForLoad();
  });
  it(`Перейти в карточку`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.REPORT).waitForExist({
      timeout: 10000,
      reverse: false,
    });
    kronaResultTable.resultTableGetData(KronaDataType.REPORT).click();
    kronaReportCard.$reportCard_yandexMap.waitForDisplayed({ timeout: 20000, reverse: false });

    expect(kronaReportCard.$table_reportSourceInfo.isDisplayed()).to.be.true;
    makeScreenshot("KRONA_SMOKE_REPORTS_КарточкаОтчёта");
  });
});
