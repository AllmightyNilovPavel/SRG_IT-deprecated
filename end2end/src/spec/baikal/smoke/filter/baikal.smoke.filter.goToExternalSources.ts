import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { kronaLoginPage } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { TestDataBaikal } from "options/testData/baikal";
import { baikalDemoBeta, baikalLeftPanelBetaFilter, baikalMapBeta } from "pages/baikal/beta/index";
import { BaikalEnumDemoModeHousingType, BaikalEnumExternalSources } from "pages/baikal/enums";
import { browserSwitchWindow } from "modules/supportMethodsForBrowserTabs";
import { EnumSwitchWindow } from "shared/enums/enum.switchWindow";
import { expect } from "chai";
import { makeScreenshot } from "modules";

let testName: string = `Байкал. Переход по внешним источникам из фильтра Байкала. (ЦИАН, Яндекс...)`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `BL-850`,
  });
  it(`Авторизоваться в Байкал-демо`, function () {
    browser.maximizeWindow();
    allureReporter.generateReport({
      description: `Данные для авторизации. \n
      Логин:${TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst}
      Пароль:${TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst}`,
    });
    baikalDemoBeta.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst,
      TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst
    );
    baikalDemoBeta.waitForLoad(TestDataBaikal.Users.login.srg.autotest_baikal_junior_analyst);
  });
  it(`Из демо режима перейти в сам Байкал на раздел "Карта"`, function () {
    allureReporter.generateReport({
      description: `Выбрать критерии для поиска аналогов и перейти к поиску аналогов на карту Байкала`,
    });
    baikalDemoBeta.search_for_realty(
      TestDataBaikal.Residential.address.address_without_houseNumber,
      BaikalEnumDemoModeHousingType.FLAT
    );
    baikalMapBeta.waitForLoad();
  });
  it(`Проверить, что в разделе "Фильтр" работают переходы на внешние источники`, function () {
    allureReporter.generateReport({
      description: `Проверям, что после нажатия по кнопкам "ЦИАН", "Яндекс", "Авито", "Домофонд" будет происходить
      редирект на соответствующие сайты.\n
      После каждой проверки возвращаемся назад в Байкал.`,
    });
    baikalLeftPanelBetaFilter.waitForLoad();

    baikalLeftPanelBetaFilter.goToExternalSource(BaikalEnumExternalSources.CIAN);
    browserSwitchWindow(`cian`, EnumSwitchWindow.switch_to_cian);
    makeScreenshot("ЦИАН");
    expect(browser.getUrl(), `Текущий URL браузера НЕ соответствует ожидаемому`).to.include(
      `www.cian.ru/map`
    );
    browserSwitchWindow(`baikal`, EnumSwitchWindow.switch_to_baikal);

    baikalLeftPanelBetaFilter.goToExternalSource(BaikalEnumExternalSources.YANDEX);
    browserSwitchWindow(`yandex`, EnumSwitchWindow.switch_to_yandex);
    makeScreenshot("ЯНКЕД");
    expect(browser.getUrl(), `Текущий URL браузера НЕ соответствует ожидаемому`).to.include(
      `realty.yandex.ru/moskva`
    );
    browserSwitchWindow(`baikal`, EnumSwitchWindow.switch_to_baikal);

    baikalLeftPanelBetaFilter.goToExternalSource(BaikalEnumExternalSources.AVITO);
    browserSwitchWindow(`avito`, EnumSwitchWindow.switch_to_avito);
    makeScreenshot("АВИТО");
    expect(browser.getUrl(), `Текущий URL браузера НЕ соответствует ожидаемому`).to.include(
      `www.avito.ru/moskva`
    );
    browserSwitchWindow(`baikal`, EnumSwitchWindow.switch_to_baikal);

    baikalLeftPanelBetaFilter.goToExternalSource(BaikalEnumExternalSources.DOMOFOND);
    browserSwitchWindow(`domofond`, EnumSwitchWindow.switch_to_domofond);
    makeScreenshot("ДОМОФОНД");
    expect(browser.getUrl(), `Текущий URL браузера НЕ соответствует ожидаемому`).to.include(
      `www.domofond.ru/karta`
    );
    browserSwitchWindow(`baikal`, EnumSwitchWindow.switch_to_baikal);
  });
});
