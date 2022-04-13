import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { kronaLoginPage, kronaNavigationBar, kronaRbRequestCard } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";
import { baikalCalc, baikalMap } from "pages/baikal";

describe(`КРОНА. СМОК. КН. Магазин.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.vtb.autotest_baikal,
      TestDataKrona.Users.password.vtb.autotest_baikal
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Переход на страницу тестового расчёта.`, function () {
    allureReporter.generateReport();
    browser.url(TestDataKrona.rbRequest.office);
    kronaRbRequestCard.waitForLoad();
  });
  it(`Клонирование расчёта.`, function () {
    allureReporter.generateReport();
    kronaRbRequestCard.$button_cloneRequest.waitForClickable();
    kronaRbRequestCard.$button_cloneRequest.scrollIntoView();
    kronaRbRequestCard.$button_cloneRequest.click();
    browser.waitUntil(() => browser.getUrl() != TestDataKrona.rbRequest.shop, {
      timeout: 10000,
      timeoutMsg: "Ошибка при клонировании расчётника",
    });
    kronaRbRequestCard.waitForLoad();
  });
  it(`Сохранение черновика клонированного расчёта.`, function () {
    allureReporter.generateReport();
    let SaveRequestDraft = kronaRbRequestCard.saveRequestDraft();
    expect(SaveRequestDraft).to.be.equal(kronaRbRequestCard.ModalSuccessfulSave);
  });
  it(`Переход в байкал.`, function () {
    allureReporter.generateReport();
    kronaRbRequestCard.$button_calculate.waitForClickable();
    kronaRbRequestCard.$button_calculate.click();
    baikalMap.waitForLoad();
  });
  it(`Открыть расчётник.`, function () {
    allureReporter.generateReport();
    baikalMap.$button_openCalculation.waitForClickable();
    baikalMap.$button_openCalculation.click();
    baikalCalc.waitForLoad();
    expect(baikalCalc.$calcTable_dataCheck).to.be.not.null;
  });
});
