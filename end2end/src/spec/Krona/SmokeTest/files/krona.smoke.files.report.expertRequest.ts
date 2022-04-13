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
  kronaReports,
  KronaDataType,
  KronaResidentialRequestStatus,
  kronaExpertRequestCard,
  KronaNavigationButtons,
  kronaErrorPage,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Файлы. Эксперт-srg. Отчёт.`, function () {
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
  it(`Открыть реестр`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REPORTS_OLD);
    kronaResultTable.waitForLoad();
  });
  it(`Отфильтровать отчёты`, function () {
    allureReporter.generateReport();
    kronaReports.select_status(KronaResidentialRequestStatus.AWAITS_EXPERT_VALUATION);
    kronaReports.$filter_appraiserCompany.setValue("ипотечный");
    kronaReports.$filter_dataFrom.clearValue();
    // kronaReports.$checkbox_currentUserRequests.click();
    kronaReports.$checkbox_CryptoSignOnly.click();
    kronaReports.$button_showResult.click();
    kronaResultTable.waitForLoad();
  });
  it(`Открыть карточку отчёта`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.EXPERT).click();
    kronaExpertRequestCard.$table_requestSourceInfo.waitForDisplayed({
      timeout: 5000,
      reverse: false,
    });
  });
  it(`Скачать отчёт со страницы эксперта`, function () {
    allureReporter.generateReport();
    kronaExpertRequestCard.waitForLoad(false);
    kronaExpertRequestCard.$button_downloadReport.scrollIntoView();
    kronaExpertRequestCard.$button_downloadReport.click();
    browser.pause(1500);
    expect(kronaErrorPage.$errorBody.isDisplayed()).to.be.false;
  });
  it(`Скриншот скачанных файлов`, function () {
    allureReporter.generateReport();
    browser.url(`chrome://downloads`);
    browser.pause(1000);
    makeScreenshot("SMOKE_Файлы_Заключение_из_карточки_Эксперта");
  });
});
