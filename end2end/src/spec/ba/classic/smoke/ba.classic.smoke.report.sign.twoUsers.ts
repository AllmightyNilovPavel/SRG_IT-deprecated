import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { FindElementByText, makeScreenshot } from "modules";
import options from "options";
import {
  baClassicNavMenu,
  baLoginPage,
  baMainPage,
  baReportPage,
  BaResidentialSignType,
  CloneOptions,
} from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import {
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaReports,
  kronaResultTable,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";

describe(`БО. Жилая недвижимость. Подпись двумя подписантами.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
  });
  let reportNum: string = "autotest_uralsib" + new Date().toISOString();
  let reportUrl: string;

  //  describe(`Часть БО`, function () {
  it(`Логин в БО`, function () {
    allureReporter.generateReport();

    baLoginPage.open();
    expect(baLoginPage.$input_login.isExisting()).to.be.true;
    baLoginPage.login(
      TestDataBa.Users.login.zarnitsa.admin,
      TestDataBa.Users.password.zarnitsa.admin
    );
  });
  it(`Закрыть окна с уведомлениями`, function () {
    allureReporter.generateReport();
    baMainPage.waitForLoad();
    expect(baMainPage.$button_newReportToModal.isExisting()).to.be.true;
  });
  it(`Поиск тестового отчёта`, function () {
    allureReporter.generateReport();
    browser.url(options.ba.host + "/report.html?id=1500060135050");
    baReportPage.waitForLoad();
    // expect(baReportPage.$input_agreementNumber.isClickable()).to.be.false;
  });
  it(`клон отчёта в бо`, function () {
    allureReporter.generateReport();
    baReportPage.cloneReport(CloneOptions.FULL);
    baReportPage.waitForLoad();
  });
  it(`Заполнение отчёта`, function () {
    allureReporter.generateReport();
    reportUrl = browser.getUrl();
    console.log(reportUrl);

    baReportPage.$input_agreementDate.setValue("ddd");
    browser.keys("Tab");
    baReportPage.$input_bankUser.setValue("Эльвира Газизова (gazizova.ehlvira@test.ru) г. Москва");
    browser.keys("Enter");
    baReportPage.$input_reportNumber.setValue(reportNum);
    baReportPage.$button_copyDate.click();
    browser.pause(1500);

    // Устанавливаем разных пользователей для подписи
    baReportPage.setSignUsers(
      TestDataBa.Users.ids.Zarnitsa.admin,
      TestDataBa.Users.ids.Zarnitsa.admin2
    );
    baReportPage.saveReport();
    baReportPage.$button_payReport.waitForClickable({ reverse: false });
    baReportPage.payReport();
    baReportPage.$button_saveReport.waitForClickable({ reverse: false });
    baReportPage.saveReport();
  });
  it(`Подпись отчёта ОЦЕНЩИКОМ`, function () {
    allureReporter.generateReport();
    this.retries(3);
    baReportPage.saveReport();
    browser.refresh();

    baReportPage.$button_signReport.waitForClickable({ reverse: false });
    baReportPage.signReport(
      BaResidentialSignType.PASSWORD,
      TestDataBa.Users.password.zarnitsa.admin
    );
    browser.waitUntil(
      () => FindElementByText(`Отчет ${reportNum} отправлен на подпись следующим`) !== null
    );
  });
  it(`Перезаход под другим пользователем`, function () {
    allureReporter.generateReport();
    baMainPage.$button_logout.scrollIntoView();
    baMainPage.$button_logout.waitForClickable();
    baMainPage.$button_logout.click();

    baLoginPage.waitForLoad();
    baLoginPage.login(
      TestDataBa.Users.login.zarnitsa.admin2,
      TestDataBa.Users.password.zarnitsa.admin2
    );

    baMainPage.waitForLoad();
  });
  it(`Подпись ДИРЕКТОРА`, function () {
    allureReporter.generateReport();
    browser.url(reportUrl);
    baReportPage.waitForLoad();
    baReportPage.$button_signReport.waitForClickable({ reverse: false });
    baReportPage.signReport(
      BaResidentialSignType.PASSWORD,
      TestDataBa.Users.password.zarnitsa.admin2
    );
    browser.back();
    // browser.refresh();
    baReportPage.waitForLoad();
    baReportPage.$selector_appraiserSignatory.scrollIntoView();
    expect(baReportPage.$selector_appraiserSignatory.getAttribute("class")).to.be.equal(
      "disabled-input"
    );
    makeScreenshot("БО_КРОНА_подписанный_отчёт");
  });
  // });
  //  describe(`Часть Кроны`, function () {
  it(`Логин в Крону`, function () {
    allureReporter.generateReport();

    kronaLoginPage.open();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Поиск тестового отчёта`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REPORTS_OLD);
    kronaReports.setReportNumber(reportNum);
    kronaReports.$button_showResult.scrollIntoView();
    kronaReports.$button_showResult.waitForClickable();
    kronaReports.$button_showResult.click();
    kronaResultTable.waitForLoad();
    let data = kronaResultTable.$result_table_allData;

    expect(data).to.be.not.null;
    makeScreenshot("БО_КРОНА_Отчёт_в_Кроне");
  });
  //  });
});
