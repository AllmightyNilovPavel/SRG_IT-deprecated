import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { join } from "path";
import { options } from "options";
import { getIdFromUrl, getFileSizeInBytes, clearDirectory, getFileExtension } from "modules";
import { baLoginPage, baMainPage, baReportPage } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`БО. СМОК. Отчёт. Квартира. Печать черновика.`, function () {
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
  it(`Проверка возможности печати отчёта.`, function () {
    allureReporter.generateReport();
    baReportPage.waitForLoad();
    expect(baReportPage.$button_printReport.isClickable()).to.be.true;
    baReportPage.$button_printReport.click();
  });
  it(`Проверка наличия кнопки скачивания`, function () {
    allureReporter.generateReport();
    baReportPage.$base_modalPrintReport.waitForDisplayed({ timeout: 2000, reverse: false });
    expect(baReportPage.$button_printQualityMiddle.isDisplayed()).to.be.true;
    expect(baReportPage.$button_printQualityMiddle.isClickable()).to.be.true;
  });
  it(`Скачивание отчёта минимального качества`, function () {
    allureReporter.generateReport();
    baReportPage.$button_printQualityMin.click();
    baReportPage.$base_modalPrintReport.waitForDisplayed({ timeout: 100000, reverse: true });
    browser.pause(3000);
  });
  it(`Проверка файла`, function () {
    allureReporter.generateReport();
    let minFileSizeInBytes = 100000.0;

    let fileName = getIdFromUrl();
    let fileNameWithExt = getFileExtension(options.downloadDir, fileName);
    let filePath = join(options.downloadDir, fileNameWithExt);

    let fileSize = getFileSizeInBytes(filePath);
    expect(fileSize).to.be.greaterThan(minFileSizeInBytes);

    browser.url("chrome://downloads/");
    browser.back();
    makeScreenshot(screenshotName);
  });
  it(`Удаление тестового отчёта`, function () {
    allureReporter.generateReport();
    baReportPage.waitForLoad();
    baReportPage.deleteReport();
    baMainPage.waitForLoad();
  });
  it(`Удаление тестовых файлов`, function () {
    allureReporter.generateReport();
    clearDirectory(options.downloadDir);
  });
});
