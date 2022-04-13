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
  reportsCreateNewFlat,
  kronaFiltersBox,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. SRG. Реестр отчётов. НОВОСТРОЙКА. Новый запрос на верификацию.`, function () {
  let generatedReportNumber: string;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в Крону под SRG`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход на страницу создания нового Отчёта.`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.NEW_REPORT);
    reportsCreateNewFlat.waitForLoad();
  });
  it(`Заполнить форму`, function () {
    allureReporter.generateReport();
    expect(browser.getUrl()).to.include(reportsCreateNewFlat.path);
    reportsCreateNewFlat.FullfillNewFlatRequest(TestDataKrona.Request.NewApartment);
    reportsCreateNewFlat.FullfillReportData(TestDataKrona.Report.NewFlat);
    generatedReportNumber = reportsCreateNewFlat.getReportNumber();

    this.retries(3);
  });
  it(`Отправка запроса и ожидание перехода в реестр отчётов.`, function () {
    allureReporter.generateReport();
    let buttonSend = reportsCreateNewFlat.$button_buttonSend;
    buttonSend.scrollIntoView({ block: "center", inline: "center" });
    buttonSend.click();
  });
  it(`Проверка наличия отчёта в реестре`, () => {
    allureReporter.generateReport();
    kronaResultTable.waitForLoad();
    kronaFiltersBox.inputReportNumber(generatedReportNumber);
    kronaFiltersBox.showResults();
    kronaResultTable.waitForLoad();

    expect(kronaResultTable.$result_table_allData).to.be.not.null;
    this.retries(3);
  });
});
