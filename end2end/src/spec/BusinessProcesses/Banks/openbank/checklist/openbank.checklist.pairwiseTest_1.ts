import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { baClassicNavMenu, baLoginPage, baMainPage } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe.skip(``, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
  });

  it(`Логин в БО под тестовой ОК`, function () {
    allureReporter.generateReport();
    baLoginPage.open();
    baLoginPage.login(
      TestDataBa.Users.login.zarnitsa.admin,
      TestDataBa.Users.password.zarnitsa.admin
    );
    baMainPage.waitForLoad();
  });
  it(`Клонирование отчёта`, function () {
    allureReporter.generateReport();
    baClassicNavMenu.search_report("");
  });
  it(`Заполнение обязательных полей`, function () {
    allureReporter.generateReport();
  });
  it(`Заполнение полей чеклиста`, function () {
    allureReporter.generateReport();
  });
  // -----------------------------------------------------------------------------
  it(`Логин в Крону под юзером Открытия`, function () {
    allureReporter.generateReport();
  });
  it(`Поиск отчёта`, function () {
    allureReporter.generateReport();
  });
  it(`Проверка значений чеклиста`, function () {
    allureReporter.generateReport();
  });
});
