import { expect } from "chai";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import {
  kronaErrorPage,
  KronaFileType,
  kronaFiltersBox,
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaResultTable,
  KronaVtbOrdersOrderStatus,
  kronaVtbOrdersRegistry,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. Коммерческая Недвижимость. ВТБ. Отчёты об Оценке. Файлы. Заключение к отчёту. Статус - "Принято".`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: testTitle,
    issueId: "WEB-30918",
  });
  let reportId: string;

  it(`Логин в Крону под ВТБ`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.login(
      TestDataKrona.Users.login.vtb.autotest_commercialRealty,
      TestDataKrona.Users.password.vtb.autotest_commercialRealty
    );
    kronaNavigationBar.waitForLoad();
    makeScreenshot(screenshotName);
  });
  it(`Переход в реестр "Отчёты об оценке ВТБ"`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.VTB_ORDERS);
    kronaVtbOrdersRegistry.waitForLoad();
    makeScreenshot(screenshotName);
  });
  it(`Поиск отчёта`, function () {
    allureReporter.generateReport({
      description: `Сортируем реестр по  Статусу: ${KronaVtbOrdersOrderStatus.BANK_READY}`,
    });
    kronaFiltersBox.selectStatus(KronaVtbOrdersOrderStatus.BANK_READY);
    kronaFiltersBox.showResults();
    kronaResultTable.waitForLoad(50000);
    makeScreenshot(screenshotName);
  });
  it(`Проверка: Скачивание заключения из реестра`, function () {
    allureReporter.generateReport({
      description: `В этом реестре имя файла
      скачиваемого заключения не соответствует номеру заявки в реестре
      поэтому мы просто проверяем что страница с ошибкой не появилась после
      скачивания.`,
    });
    let target = kronaResultTable.resultTable_download(KronaFileType.VTB_ORDERS_CONCLUSION);
    target.scrollIntoView();
    target.waitForClickable();
    target.click();
    makeScreenshot(screenshotName);
    browser.pause(5000);

    expect(kronaErrorPage.$errorBody.isDisplayed()).to.be.false;
    makeScreenshot(screenshotName);
  });
});
