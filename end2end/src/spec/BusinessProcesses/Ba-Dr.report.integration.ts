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
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`БО. КРОНА. Согласование отчёта из БО в Кроне.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
  });
  let reportNum: string = "autotest_uralsib" + String(Date.now());
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
});
