import { expect } from "chai";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { baLoginPage, baMainPage } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`BA. CLASSIC. COMMERCIAL_REALTY. Отчёт. Создание нового с нуля.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: testTitle,
  });
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
  it(`Создать новый отчёт по КН`, function () {
    allureReporter.generateReport();
    baMainPage.$button_newReportToModal.click();
    expect(baMainPage.$button_CreateNewCommReport.isDisplayed()).to.be.true;
    baMainPage.$button_CreateNewCommReport.click();
  });
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
});
