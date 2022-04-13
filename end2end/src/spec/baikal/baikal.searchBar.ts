import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";

import { kronaLoginPage } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";

import {
  baikalDemoBeta,
  BaikalEnumDemoModeHousingType,
  BaikalEnumHeader,
  baikalHeaderBeta,
  baikalMapBeta,
  baikalOfferFullBeta,
  baikalOffersBeta,
  baikalSearchByLink,
} from "pages/baikal/index";

import { TestDataBaikal } from "options/testData/baikal";
import { makeScreenshot } from "modules/screenshotsMaker";

import { expect } from "chai";
import { debugLogging } from "modules";

let testName: string = `Байкал. Проверка поисковой строки в разделе "Карта"`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `BL-711`,
  });
  it(`Авторизоваться в Байкал-демо`, function () {
    allureReporter.generateReport();
    browser.maximizeWindow();
    baikalDemoBeta.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst,
      TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst
    );
    baikalDemoBeta.waitForLoad(TestDataBaikal.Users.login.srg.autotest_baikal_junior_analyst);
  });
  it(`Заполнить критерии поиска и перейти на карту Байкала`, function () {
    allureReporter.generateReport();
    baikalDemoBeta.search_for_realty(
      TestDataBaikal.Residential.address.address_without_houseNumber,
      BaikalEnumDemoModeHousingType.FLAT
    );
  });
  it(`Перейти в карточку аналога`, function () {
    allureReporter.generateReport();
    baikalHeaderBeta.goToSection(BaikalEnumHeader.LIST_OF_OBJECTS);
    baikalOffersBeta.waitForLoad();
    baikalOffersBeta.showAsList();
    baikalOffersBeta.goToOfferCard(1);
  });
  it(`Проверить поиск в Байкале по URL источника объявления`, function () {
    allureReporter.generateReport();
    let offer_full_link = baikalOfferFullBeta.$offerFullLink.getAttribute(`href`);
    debugLogging(`Ссылка на источник объявления = ${offer_full_link}`);
    baikalHeaderBeta.goToSection(BaikalEnumHeader.MAP);
    baikalMapBeta.waitForLoad();
    baikalMapBeta.search(offer_full_link);
    baikalSearchByLink.waitForLoad();
    debugLogging(`URL карточки аналога = ${browser.getUrl()}`);
    debugLogging(`Длина найденных аналогов = ${baikalSearchByLink.$$table_rows.length}`);
    let errorMessage: string = `В результирующей таблице нет строк, значит по искомому URL ${offer_full_link} ничего
    не было найдено!`;
    expect(baikalSearchByLink.$$table_rows.length, errorMessage).greaterThan(0);
    makeScreenshot(`1`);
  });
});
