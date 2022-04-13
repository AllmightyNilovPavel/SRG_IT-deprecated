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
  KronaFileType,
  KronaResidentialRequestStatus,
  KronaNavigationButtons,
  kronaErrorPage,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Файлы. Реестр отчётов. Файл подписи ЭЦП.`, function () {
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
    kronaReports.select_status(KronaResidentialRequestStatus.ACCEPTED_AUTO_VALUATION);
    kronaReports.$filter_appraiserCompany.setValue("ипотечный");
    kronaReports.$filter_dataFrom.clearValue();
    // kronaReports.$checkbox_currentUserRequests.click();
    kronaReports.$checkbox_CryptoSignOnly.click();
    kronaReports.$button_showResult.click();
    kronaResultTable.waitForLoad();
  });
  it(`Скачать файл подписи`, function () {
    allureReporter.generateReport();
    let target = kronaResultTable.resultTable_download(KronaFileType.digital_sign);

    target.scrollIntoView({ block: "center", inline: "center" });
    target.click();

    browser.pause(1500);
    expect(kronaErrorPage.$errorBody.isDisplayed()).to.be.false;
    makeScreenshot("Krona_smoke_РеестрОтчётов-файлПодписиЭцп");
  });
});
