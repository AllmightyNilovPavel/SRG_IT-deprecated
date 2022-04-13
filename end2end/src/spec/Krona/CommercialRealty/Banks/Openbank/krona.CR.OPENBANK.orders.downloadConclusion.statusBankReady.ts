import { expect } from "chai";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { FindFile } from "modules/files/FindFile";
import {
  kronaErrorPage,
  KronaFileType,
  kronaFiltersBox,
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaOpenbankOrdersRegistry,
  kronaResultTable,
  KronaVtbOrdersOrderStatus,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";
import { ChromeDownloadsFindFileByName } from "modules/chromeDownloads/chromeDownloads.findFile";

describe(`КРОНА. Коммерческая Недвижимость. Открытие. Отчёты об Оценке. Файлы. Заключение к отчёту. Статус - "Принято".`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: testTitle,
    issueId: "WEB-30918",
  });
  let reportId: string;

  it(`Логин в Крону под Открытие`, function () {
    allureReporter.generateReport();

    kronaLoginPage.open();
    kronaLoginPage.login(
      TestDataKrona.Users.login.openbank.autotest_commercialRealty,
      TestDataKrona.Users.password.openbank.autotest_commercialRealty
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в реестр КН`, function () {
    allureReporter.generateReport();

    kronaNavigationBar.navigate_to(KronaNavigationButtons.OPENBANK_ORDERS);
    kronaOpenbankOrdersRegistry.waitForLoad();
  });
  it(`Поиск отчёта`, function () {
    allureReporter.generateReport({
      description: `Сортируем реестр по Статусу: ${KronaVtbOrdersOrderStatus.BANK_READY}`,
    });
    kronaFiltersBox.selectStatus(KronaVtbOrdersOrderStatus.BANK_READY);
    kronaFiltersBox.showResults();
    kronaResultTable.waitForLoad(50000);
  });
  it(`Проверка: Скачивание заключения из реестра`, function () {
    allureReporter.generateReport();

    let target = kronaResultTable.resultTable_download(KronaFileType.OPENBANK_ORDERS_CONCLUSION);
    reportId = target.getAttribute("href").match(/\d{4,}/)![0];

    target.scrollIntoView();
    target.waitForClickable();
    target.click();
    browser.pause(3000);

    expect(kronaErrorPage.$errorBody.isDisplayed()).to.be.false;
    makeScreenshot(screenshotName);
  });
  it(`Проверка файла`, async function () {
    allureReporter.generateReport({
      description: `На этом шаге проверяется наличие файла в системе и его размер что он хотя бы НЕ пустой.`,
    });
    const ExpectedMinimumFileSizeInBytes: number = 10;
    let fileChecker: boolean = await FindFile(reportId, ExpectedMinimumFileSizeInBytes);
    let errorMsg: string = `Текущий размер файла ${fileChecker} не соответствует ожидаемому ${ExpectedMinimumFileSizeInBytes}`;
    expect(fileChecker, errorMsg).to.be.true;
  });
});
