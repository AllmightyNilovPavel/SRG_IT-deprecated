import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { reactMainPage } from "pages/ba/react";
import { baLoginPage, baMainPage, baReportPage } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`БО. РЕАКТ. СМОК. Создание отчёта по квартире и сохранения черновика.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
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
  it(`Перейти в режим реакта`, function () {
    allureReporter.generateReport();
    baMainPage.$button_switchToReact.waitForDisplayed();
    baMainPage.$button_switchToReact.click();
    reactMainPage.waitForLoad();
  });
  it(`Создать новый отчёт по квартире`, function () {
    allureReporter.generateReport();
    reactMainPage.$button_CreateNewResidentialReport.waitForClickable();
    reactMainPage.$button_CreateNewResidentialReport.click();
    baReportPage.waitForLoad();
  });
  it(`Заполнение номера отчёта и сохранение`, function () {
    allureReporter.generateReport();
    expect(baReportPage.$input_reportNumber.isExisting()).to.be.true;
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
    makeScreenshot("REACT_SMOKE_NewReport_Draft");
  });
  it(`Удаление тестового отчёта`, function () {
    allureReporter.generateReport();
    baReportPage.deleteReport();
    reactMainPage.waitForLoad();
  });
});
