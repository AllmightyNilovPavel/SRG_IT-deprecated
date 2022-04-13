import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { faMain } from "pages/fa/fa.main";
import { SiteList } from "pages/fa/enum/fa.enum.siteList";
import { alfaOcenka, expressOcenka, openOcenka } from "pages/fa";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";
import { expect } from "chai";

//  Тест для проверки изменений по задаче
//  WEB-31406 -> https://srgroup.atlassian.net/browse/WEB-31406
const FlatNumberMaxLength = "9";

describe(`FA. UI. Номер квартиры. Проверка длины поля`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
    issueId: "WEB-31406",
  });
  it.skip(`Банк Россия`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.ABR);
    makeScreenshot(this.test!.title);
  });
  it.skip(`Абсолют`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.ABSOLUT);
    makeScreenshot(this.test!.title);
  });
  it(`Альфа`, function () {
    allureReporter.generateReport({
      description: `Проверяем что сайт вообще открывается.
    А так же что длина поля "номер дома" соответствует длине по задаче.`,
    });
    faMain.goToSite(SiteList.ALFABANK);
    alfaOcenka.$inputFlatNumber.waitForDisplayed();

    let test = alfaOcenka.$inputFlatNumber.getAttribute("maxLength");
    expect(test).to.be.equal(FlatNumberMaxLength);
    makeScreenshot(this.test!.title);
  });
  it.skip(`БЖФ`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.BGF);
    makeScreenshot(this.test!.title);
  });
  it.skip(`БСПБ`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.BSPB);
    makeScreenshot(this.test!.title);
  });
  it.skip(`Дельтакредит`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.DELTA);
    makeScreenshot(this.test!.title);
  });
  it.skip(`Дом.Рф`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.DOM_RF);
    makeScreenshot(this.test!.title);
  });
  it.skip(`ГПБ`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.GAZPROM);
    makeScreenshot(this.test!.title);
  });
  it.skip(`Металлинвест`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.METIB);
    makeScreenshot(this.test!.title);
  });
  it.skip(`Открытие`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.OPENBANK);
    makeScreenshot(this.test!.title);
  });
  it.skip(`Партнёрка`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.PARTNER);
    makeScreenshot(this.test!.title);
  });
  it.skip(`ПСБ`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.PSB);
    makeScreenshot(this.test!.title);
  });
  it.skip(`Сельхоз`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.SELHOZ);
    makeScreenshot(this.test!.title);
  });
  it.skip(`СМП`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.SMP);
    makeScreenshot(this.test!.title);
  });
  it.skip(`Совком`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.SOVCOMBANK);
    makeScreenshot(this.test!.title);
  });
  it.skip(`Связьбанк`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.SVIAZBANK);
    makeScreenshot(this.test!.title);
  });
  it.skip(`Юникредит`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.UNICREDIT);
    makeScreenshot(this.test!.title);
  });
  it.skip(`Уралсиб`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.URALSIB);
    makeScreenshot(this.test!.title);
  });
  it(`Экспресс-оценка`, function () {
    allureReporter.generateReport({
      description: `Проверяем что сайт вообще открывается.
    А так же что длина поля "номер дома" соответствует длине по задаче.`,
    });
    faMain.goToSite(SiteList.EXPRESS);
    browser.url(`https://express-ocenka.srg-test.ru/appraisal/`);
    expressOcenka.$buttonMakeOrder.waitForDisplayed();

    let test = expressOcenka.$inputFlatNumber.getAttribute("maxLength");
    expect(test).to.be.equal(FlatNumberMaxLength);
    makeScreenshot(this.test!.title);
  });
  it.skip(`ВТБ`, function () {
    allureReporter.generateReport({ description: `` });
    faMain.goToSite(SiteList.VTB);
    makeScreenshot(this.test!.title);
  });
});
