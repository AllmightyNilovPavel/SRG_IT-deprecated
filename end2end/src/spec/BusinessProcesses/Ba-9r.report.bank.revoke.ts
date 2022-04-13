import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  baClassicNavMenu,
  baLoginPage,
  baMainPage,
  baReportPage,
  BaResidentialSignType,
  CloneOptions,
} from "pages/ba/classic";
import {
  KronaDataType,
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaReports,
  kronaResultTable,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

let reportNum: string = "autotest_uralsib" + String(Date.now());

describe(`БО. КРОНА. Проверка возврата на доработку из Кроны.`, function () {
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
    baClassicNavMenu.search_report("autotest-uralsib");
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
  it(`возврат на доработку`, function () {
    this.retries(3);

    allureReporter.generateReport();
    browser.pause(60000);
    kronaResultTable
      .resultTableGetData(KronaDataType.REPORT)
      .waitForExist({ timeout: 15000, reverse: false, timeoutMsg: "В реестре нет этого отчёта" });
    expect(kronaResultTable.$resultTable_reportRevoke.isExisting()).to.be.true;
    kronaResultTable.$resultTable_reportRevoke.waitForClickable();
    kronaResultTable.$resultTable_reportRevoke.click();
    kronaReports.$base_modalRevoke.waitForDisplayed({ timeout: 2000, reverse: false });
    expect(kronaReports.$input_modalRevokeComment.isClickable()).to.be.true;
    kronaReports.reportRevoke(reportNum);
  });
  it(`проверка статуса отчёта в КРОНЕ`, function () {
    allureReporter.generateReport();
    kronaReports.$base_modalRevoke.waitForDisplayed({ timeout: 2000, reverse: true });
    //  kronaResultTable.resultTableGetData( KronaDataType.REPORT).waitForDisplayed({});
    expect(kronaResultTable.$resultTable_reportRevokeDone.isDisplayed()).to.be.true;
  });
  it(`возврат на вкладку с БО`, function () {
    allureReporter.generateReport();
    browser.switchToWindow(browser.getWindowHandles()[1]);
    browser.back();
  });
  it(`проверка статуса отчёта в БО`, function () {
    allureReporter.generateReport();
    baReportPage.waitForLoad();
    baReportPage.$info_revokeComment.waitForDisplayed({});
    expect(baReportPage.$info_revokeComment.isDisplayed(), "Коммент после возврата - не появился")
      .to.be.true;
    let check = baReportPage.$info_revokeCommentText.getText();
    console.log("Текст сообщения после возврата:", check);
    expect(check, "Текст не совпадает").to.be.eql("Банк вернул отчет на доработку");
    expect(baReportPage.$button_changeReport.isClickable(), "Кнопка 'Изменить отчёт' отсутствует")
      .to.be.true;
  });
});
