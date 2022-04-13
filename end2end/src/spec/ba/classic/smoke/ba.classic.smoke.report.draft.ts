import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { baLoginPage, baMainPage, baReportPage } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`БО. СМОК. Отчёт. Квартира. Черновик.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: testTitle,
  });

  let UniqueReportNumber = String(Date.now());

  it(`Логин в БО`, function () {
    allureReporter.generateReport();
    baLoginPage.open();
    baLoginPage.waitForLoad();
    expect(baLoginPage.$input_login.isExisting()).to.be.true;
    expect(baLoginPage.$input_password.isExisting()).to.be.true;
    baLoginPage.login(
      TestDataBa.Users.login.zarnitsa.admin,
      TestDataBa.Users.password.zarnitsa.admin
    );

    baMainPage.waitForLoad();
    expect(baMainPage.$button_newReportToModal.isExisting()).to.be.true;
  });
  it(`Нажать кнопку "новый отчёт"`, function () {
    allureReporter.generateReport();
    baMainPage.$button_newReportToModal.click();
    baMainPage.$modal_reportSelection.waitForDisplayed({});
  });
  it(`Создать новый отчёт по квартире`, function () {
    allureReporter.generateReport();
    baMainPage.$button_CreateNewReport.click();
    baReportPage.waitForLoad();
  });
  it(`Проверка на наличие поля ввода номера отчёта`, function () {
    allureReporter.generateReport();
    expect(baReportPage.$input_reportNumber.isExisting()).to.be.true;
  });
  it(`Заполнение номера отчёта и сохранение`, function () {
    allureReporter.generateReport();
    baReportPage.$input_reportNumber.scrollIntoView();
    baReportPage.$input_reportNumber.setValue(UniqueReportNumber);
    baReportPage.saveReport();
  });
  it(`Проверка соответствия сохранённого номера отчёта - введённому.`, function () {
    allureReporter.generateReport();
    browser.refresh();
    baReportPage.waitForLoad();
    baReportPage.$input_reportNumber.scrollIntoView();
    expect(baReportPage.$input_reportNumber.getValue()).to.be.equal(UniqueReportNumber);
    makeScreenshot(screenshotName);
  });
  it(`Удаление тестового отчёта`, function () {
    allureReporter.generateReport();
    baReportPage.deleteReport();
    baMainPage.waitForLoad();
  });
});
