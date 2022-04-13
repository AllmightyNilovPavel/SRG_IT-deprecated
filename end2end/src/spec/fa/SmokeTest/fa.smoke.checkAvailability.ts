import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { faMain } from "pages/fa/fa.main";
import { SiteList } from "pages/fa/enum/fa.enum.siteList";
import { makeScreenshot } from "modules";

describe.only(`FA. SMOKE. Проверка доступности сайтов`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Банк Россия`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.ABR);
    makeScreenshot("FA_SMOKE_SITE-ABR");
  });
  it(`Абсолют`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.ABSOLUT);
    makeScreenshot("FA_SMOKE_SITE-ABSOLUT");
  });
  it(`Альфа`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.ALFABANK);
    makeScreenshot("FA_SMOKE_SITE-ALFABANK");
  });
  it(`БЖФ`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.BGF);
    makeScreenshot("FA_SMOKE_SITE-BGF");
  });
  it(`БСПБ`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.BSPB);
    makeScreenshot("FA_SMOKE_SITE-BSPB");
  });
  it(`Дельтакредит`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.DELTA);
    makeScreenshot("FA_SMOKE_SITE-DELTA");
  });
  it(`Дом.Рф`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.DOM_RF);
    makeScreenshot("FA_SMOKE_SITE-DOM_RF");
  });
  it(`ГПБ`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.GAZPROM);
    makeScreenshot("FA_SMOKE_SITE-GPB");
  });
  it(`Металлинвест`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.METIB);
    makeScreenshot("FA_SMOKE_SITE-METIB");
  });
  it(`Открытие`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.OPENBANK);
    makeScreenshot("FA_SMOKE_SITE-OPENBANK");
  });
  it(`Партнёрка`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.PARTNER);
    makeScreenshot("FA_SMOKE_SITE-PARTNER_OCENKA");
  });
  it(`ПСБ`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.PSB);
    makeScreenshot("FA_SMOKE_SITE-PSB");
  });
  it.skip(`Сельхоз`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.SELHOZ);
    makeScreenshot("FA_SMOKE_SITE-SELHOZ");
  });
  it(`СМП`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.SMP);
    makeScreenshot("FA_SMOKE_SITE-SMP");
  });
  it(`Совком`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.SOVCOMBANK);
    makeScreenshot("FA_SMOKE_SITE-SOVCOMBANK");
  });
  it.skip(`Связьбанк`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.SVIAZBANK);
    makeScreenshot("FA_SMOKE_SITE-SVIAZBANK");
  });
  it(`Юникредит`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.UNICREDIT);
    makeScreenshot("FA_SMOKE_SITE-UNICREDIT");
  });
  it(`Уралсиб`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.URALSIB);
    makeScreenshot("FA_SMOKE_SITE-URALSIB");
  });
  it(`Обычная экспресс-оценка`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.EXPRESS);
    makeScreenshot("FA_SMOKE_SITE-EXPRESS_SITE");
  });
  it(`ВТБ`, function () {
    allureReporter.generateReport();
    faMain.goToSite(SiteList.VTB);
    makeScreenshot("FA_SMOKE_SITE-VTB");
  });
});
