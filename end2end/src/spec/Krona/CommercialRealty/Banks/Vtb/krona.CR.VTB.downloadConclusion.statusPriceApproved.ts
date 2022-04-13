import { expect } from "chai";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { FindFile } from "modules/files/FindFile";
import {
  kronaCommercialRealtyReportsRegistry,
  KronaCommercialVtbVerificationStatus,
  kronaErrorPage,
  KronaFileType,
  kronaFiltersBox,
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaResultTable,
  options,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. Коммерческая Недвижимость. ВТБ. Файлы. Заключение к отчёту. Статус - Стоимость Одобрена.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: testTitle,
    issueId: "WEB-30918",
  });
  let reportId: string = "ReportFile";

  it(`Логин в Крону под ВТБ`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.login(
      TestDataKrona.Users.login.vtb.autotest_commercialRealty,
      TestDataKrona.Users.password.vtb.autotest_commercialRealty
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в реестр КН`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.COMMERCIAL_REPORTS);
    kronaCommercialRealtyReportsRegistry.waitForLoad();
  });
  it(`Поиск отчёта`, function () {
    allureReporter.generateReport({
      description: `Сортируем реестр по "Дате ОТ":${options.Date.startOfCurrentYear} и по Статусу: ${KronaCommercialVtbVerificationStatus.CONCLUSION_PRICE_APPROVED}`,
    });
    kronaFiltersBox.$inputDateBegin.setValue(options.Date.startOfCurrentYear);
    kronaFiltersBox.selectVerificationStatus(
      KronaCommercialVtbVerificationStatus.CONCLUSION_PRICE_APPROVED
    );
    kronaFiltersBox.showResults();
    kronaResultTable.waitForLoad(50000);
  });
  it(`Проверка: Скачивание заключения из реестра`, function () {
    allureReporter.generateReport();
    let target = kronaResultTable.resultTable_download(KronaFileType.COMMERCIAL_REPORT);

    target.scrollIntoView();
    target.waitForClickable();
    target.click();
    browser.pause(5000);

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
