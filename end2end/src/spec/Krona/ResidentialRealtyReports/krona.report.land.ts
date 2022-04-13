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
  reportCreateLand,
  kronaResultTable,
  kronaFiltersBox,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. SRG. Реестр отчётов. ЗЕМЛЯ. Новый запрос на верификацию.`, function () {
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
  it(`Переход на страницу создания нового Отчёта`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.NEW_REPORT);
    reportCreateLand.waitForLoad();
  });
  it(`Заполнить форму`, function () {
    allureReporter.generateReport();
    expect(browser.getUrl()).to.include(reportCreateLand.path);
    reportCreateLand.FullfillLandRequest(TestDataKrona.Request.Land);
    reportCreateLand.FullfillReportData(TestDataKrona.Report.Flat);
    generatedReportNumber = reportCreateLand.getReportNumber();

    this.retries(3);
  });
  it(`Отправить запрос`, function () {
    allureReporter.generateReport();
    reportCreateLand.$button_buttonSend.scrollIntoView({ block: "center", inline: "center" });
    reportCreateLand.$button_buttonSend.click();
    kronaResultTable.waitForLoad();
    /* // После первой попытки отправить отчёт
    // идёт проверка на правильность ввода кадастрового номера
    // поэтому необходимо подождать обновление страницы
    // и отправить снова
    browser.waitUntil(() => reportCreateLand.$input_addressAutocomplete.isDisplayedInViewport(), {
      timeout: 20000,
      timeoutMsg: "Сообщение о некорректном кадастровом номере не появилось.",
    });

    reportCreateLand.$button_buttonSend.scrollIntoView();
    reportCreateLand.$button_buttonSend.waitForClickable();
    reportCreateLand.$button_buttonSend.click(); */
    // });
    // it(`Отправка запроса и ожидание перехода в реестр отчётов.`, function () {
    //   allureReporter.generateReport();
    //   let buttonSend = reportCreateLand.$button_buttonSend;
    //   buttonSend.scrollIntoView({ block: "center", inline: "center" });
    //   buttonSend.click();
    //   kronaResultTable.waitForLoad();
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
