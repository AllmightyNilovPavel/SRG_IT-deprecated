import { expect } from "chai";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { baLoginPage, baMainPage, baReportPage, BaResidentialBanks } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe.skip(`БО. Отчёт. ВТБ. Подпись. Один пароль.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
  });
  let UniqueReportNumber = "Autotest_signPassword_" + String(Date.now());
  it(`Логин в БО под Зарницей`, function () {
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
  });
  it(`Создать новый отчёт по квартире`, function () {
    allureReporter.generateReport();
    baMainPage.$button_newReportToModal.click();
    baMainPage.$modal_reportSelection.waitForDisplayed({});
    baMainPage.$button_CreateNewReport.click();
    baReportPage.waitForLoad();
  });
  it(`Выбор банка ВТБ`, function () {
    allureReporter.generateReport();
    baReportPage.$selector_bank.scrollIntoView();
    baReportPage.select_bank(BaResidentialBanks.VTB);
  });
  it(`Изменить номер отчёта`, function () {
    allureReporter.generateReport();
    baReportPage.$input_reportNumber.scrollIntoView();
    baReportPage.input_reportNumber(true, UniqueReportNumber);
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
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
});
