import { expect } from "chai";
import { makeScreenshot } from "modules";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { FindFile } from "modules/files/FindFile";
import { TestDataKrona } from "options/testData/krona";
import {
  KronaCommercialOpenbankVerificationStatus,
  kronaCommercialRealtyReportsRegistry,
  kronaErrorPage,
  KronaFileType,
  kronaFiltersBox,
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaResultTable,
} from "pages/Krona";

describe(`КРОНА. Коммерческая Недвижимость. ОТКРЫТИЕ. Файлы. Заключение к отчёту. Статус - Готово.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: testTitle,
    issueId: "WEB-30918",
  });

  let reportId;

  it(`Логин в Крону под Открытием`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.login(
      TestDataKrona.Users.login.openbank.autotest_commercialRealty,
      TestDataKrona.Users.password.openbank.autotest_commercialRealty
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в реестр КН`, function () {
    kronaNavigationBar.navigate_to(KronaNavigationButtons.COMMERCIAL_REPORTS);
    kronaCommercialRealtyReportsRegistry.waitForLoad();
  });
  it(`Поиск отчёта`, function () {
    allureReporter.generateReport({
      description: `Сортируем реестр  по Статусу: ${KronaCommercialOpenbankVerificationStatus.READY}`,
    });
    kronaFiltersBox.selectVerificationStatus(KronaCommercialOpenbankVerificationStatus.READY);
    kronaFiltersBox.showResults();
    kronaResultTable.waitForLoad(50000);
  });
  it(`Проверка: Скачивание заключения из реестра`, function () {
    allureReporter.generateReport();

    let target = kronaResultTable.resultTable_download(KronaFileType.COMMERCIAL_CONCLUSION);
    reportId = target.getAttribute("href").match(/\d{4,}/)![0];
    console.log(reportId);
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
