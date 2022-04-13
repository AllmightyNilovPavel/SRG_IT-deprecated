import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { KronaRegions } from "pages/Krona/Enums/krona.enum.regions";
import {
  kronaLoginPage,
  kronaNavigationBar,
  KronaNavigationButtons,
  kronaSmartAppraisers,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";
import { FindFile } from "modules/files/FindFile";

describe(`КРОНА. СМОК. VTB. Участники SMART. Выгрузка.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону под ВТБ`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.vtb.autotest_smartAppraisers,
      TestDataKrona.Users.password.vtb.autotest_smartAppraisers
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход в реестр Участники Smart`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.SMART_APPRAISERS);
    kronaSmartAppraisers.waitForLoad();
  });
  it(`Выбор региона`, function () {
    allureReporter.generateReport();
    kronaSmartAppraisers.chooseRegion(KronaRegions.ALL_REGIONS);
    kronaSmartAppraisers.downloadAnalytics();
    makeScreenshot(`Успешно скачали`);
  });
  it(`Проверка файла`, async function () {
    allureReporter.generateReport();
    let minFileSizeInBytes = 8000.0;
    let fileName = "smart-";

    let fileCheckResult: boolean = await FindFile(fileName, minFileSizeInBytes);

    expect(fileCheckResult, `Ошибка при скачивании файла Оценщиков. Страница ${browser.getUrl()}`)
      .to.be.true;
  });
});
