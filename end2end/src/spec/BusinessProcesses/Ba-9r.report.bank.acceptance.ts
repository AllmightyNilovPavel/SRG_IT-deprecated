import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  KronaDataType,
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaReports,
  kronaResultTable,
} from "pages/Krona";
import {
  baClassicNavMenu,
  baLoginPage,
  baMainPage,
  baReportPage,
  BaResidentialSignType,
  CloneOptions,
} from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

let reportNum: string = "autotest_uralsib" + String(Date.now());

describe(`БО. КРОНА. Согласование отчёта из БО в Кроне.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
  });

  it(`Логин в БО`, function () {
    allureReporter.generateReport();
    baLoginPage.open();
    expect(baLoginPage.$input_login.isExisting()).to.be.true;
    baLoginPage.login(
      TestDataBa.Users.login.zarnitsa.admin,
      TestDataBa.Users.password.zarnitsa.admin
    );

    baMainPage.waitForLoad();
    expect(baMainPage.$button_newReportToModal.isExisting()).to.be.true;
  });
  it(`Поиск тестового отчёта`, function () {
    allureReporter.generateReport();
    baClassicNavMenu.$input_reportSearch.click();
    baClassicNavMenu.$input_reportSearch.setValue("autotest-uralsib");
    baClassicNavMenu.$reportSearch_result.waitForDisplayed({ timeout: 5000 });
    expect(baClassicNavMenu.$reportSearch_result.isClickable()).to.be.true;
  });
  it(`Открыть найденный отчёт.`, function () {
    allureReporter.generateReport();
    baClassicNavMenu.$reportSearch_result.click();
    // Переключаемся на вкладку с найденным через поиск отчётом
    // browser.pause(1000);
    browser.switchToWindow(browser.getWindowHandles()[1]);
    baReportPage.waitForLoad();
    expect(baReportPage.$input_agreementNumber.isClickable()).to.be.false;
  });
  it(`клон отчёта в бо`, function () {
    allureReporter.generateReport();
    baReportPage.cloneReport(CloneOptions.FULL);
    baReportPage.waitForLoad();
  });
  it(`Заполнение отчёта`, function () {
    allureReporter.generateReport();
    baReportPage.$input_agreementDate.setValue("ddd");
    browser.keys("Tab");
    baReportPage.$input_bankUser.setValue("test_uralsib");
    browser.keys("Enter");
    baReportPage.$input_reportNumber.setValue(reportNum);
    baReportPage.$button_copyDate.click();
    browser.pause(1500);

    baReportPage.setSignUsers();
    baReportPage.saveReport();
  });
  it(`Подпись отчёта`, function () {
    allureReporter.generateReport();
    baReportPage.$button_payReport.waitForClickable({ reverse: false });
    baReportPage.payReport();
    baReportPage.$button_saveReport.waitForClickable({ reverse: false });
    baReportPage.saveReport();
    baReportPage.$button_signReport.waitForClickable({ reverse: false });
    baReportPage.signReport(
      BaResidentialSignType.PASSWORD,
      TestDataBa.Users.password.zarnitsa.admin
    );
  });
  it(`Открыть крону в первой вкладке`, function () {
    allureReporter.generateReport();
    browser.switchToWindow(browser.getWindowHandles()[0]);
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
  });
  it(`Логин в крону`, function () {
    allureReporter.generateReport();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Открыть реестр отчётов`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REPORTS_OLD);
    kronaResultTable.waitForLoad();
    browser.pause(10000);
  });
  it(`поиск отчёта`, function () {
    allureReporter.generateReport();
    kronaReports.$filter_reportNumber.setValue(reportNum);
    kronaReports.$button_showResult.click();
    kronaResultTable.waitForLoad();
    expect(kronaResultTable.resultTableGetData(KronaDataType.REPORT)).to.be.not.empty;
  });
  it(`Согласование отчёта`, function () {
    allureReporter.generateReport();
    browser.pause(60000);
    kronaResultTable
      .resultTableGetData(KronaDataType.REPORT)
      .waitForExist({ timeout: 15000, reverse: false, timeoutMsg: "В реестре нет этого отчёта" });
    expect(kronaResultTable.$resultTable_reportRevoke.isExisting()).to.be.true;
    kronaResultTable.$resultTable_reportAccept.waitForClickable();
    kronaResultTable.$resultTable_reportAccept.click();
    kronaReports.$base_modalApprove.waitForDisplayed({ timeout: 2000, reverse: false });
    kronaReports.$button_modalApproveSend.click();
  });
  it(`Обновление фильтра`, function () {
    allureReporter.generateReport();
    browser.refresh();
    kronaReports.$filter_reportNumber.setValue(reportNum);
    kronaReports.$button_showResult.click();
    kronaResultTable.waitForLoad();
  });
  it(`Проверка статуса отчёта после Одобрения`, function () {
    allureReporter.generateReport();
    expect(kronaResultTable.$resultTable_reportAcceptDone.isDisplayed()).to.be.true;
  });
  it(`возврат на вкладку с БО`, function () {
    allureReporter.generateReport();
    browser.switchToWindow(browser.getWindowHandles()[1]);
    // browser.back();
  });
  it(`проверка статуса отчёта в БО`, function () {
    allureReporter.generateReport();
    // baReportPage.waitForLoad()
    baMainPage.open();
    baMainPage.waitForLoad();

    let target = $(`//*[contains(text(),'${reportNum}')]/..//span[@class='text-APPROVED_BY_UBRR']`);
    expect(target.isDisplayed()).to.be.true;
  });
});
