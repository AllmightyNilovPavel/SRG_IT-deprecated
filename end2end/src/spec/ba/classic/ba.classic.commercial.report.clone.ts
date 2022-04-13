import { expect } from "chai";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { baLoginPage, baMainPage } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`BA. CLASSIC. COMMERCIAL_REALTY. Отчёт. Клонирование.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.KRONA,
    story: this.title,
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
  // it(`Найти клонируемый отчёт через поиск`, function () {
  // allureReporter.generateReport();
  //   baClassicNavMenu.search_report("autotest_commercial-built_in-empty");
  //   reportCommercial.waitForLoad();
  // });
  // it(`Проверить что отчёт может быть клонирован`, function () {});
  // it(`Клонировать отчёт`, function () {});
  // it(`Проверить что отчёт клонировался успешно`, function () {});
  // it(`Удалить клон отчёта`, function () {});
});
