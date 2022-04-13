import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";

import { kronaLoginPage } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { TestDataBaikal } from "options/testData/baikal";
import {
  baikalDemoBeta,
  baikalMapBeta,
  baikalRightPanelBetaComparables,
  baikalLeftPanelBetaComparables,
} from "pages/baikal/beta/index";
import {
  BaikalEnumDemoModeHousingType,
  BaikalEnumRightPanelButtons,
  BaikalEnumLeftPanelButtons,
} from "pages/baikal/enums";
import { expect } from "chai";
import { makeScreenshot } from "modules";

let testName: string = `Байкал. Открытие раздела "Аналоги" из правой панели Байкала`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `BL-815`,
  });
  it(`Авторизоваться в Байкал-демо`, function () {
    browser.maximizeWindow();
    allureReporter.generateReport({
      description: `Данные для авторизации.\n
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
      description: `Выбрать критерии для поиска аналогов и перейти к поиску аналогов на карту Байкала. \n
      Критерии: ${JSON.stringify(
        TestDataBaikal.Residential.address.address_without_houseNumber,
        void 0,
        2
      )}`,
    });
    baikalDemoBeta.search_for_realty(
      TestDataBaikal.Residential.address.address_without_houseNumber,
      BaikalEnumDemoModeHousingType.FLAT
    );
    baikalMapBeta.waitForLoad();
  });
  it(`Проверка раздела "Аналоги" из правой панели Байкала.`, function () {
    allureReporter.generateReport();
    expect(
      baikalRightPanelBetaComparables.$offers_short_list_root.isDisplayed(),
      `При открытии раздела "Карта" раздел "Аналоги" из правой панели НЕ должен быть открытым.`
    ).to.be.false;
    makeScreenshot(`Аналоги из ПРАВОЙ панели ЗАКРЫТЫ`);
    baikalRightPanelBetaComparables.goToSectionFromRightMenu(
      BaikalEnumRightPanelButtons.COMPARABLES
    );
    expect(
      baikalRightPanelBetaComparables.$offers_short_list_root.isDisplayed(),
      `После клика по разделу "Аналоги" из правой панели Байкала раздел "Аналоги" должен открыться, но
      этого не произошло`
    ).to.be.true;
    makeScreenshot(`Аналоги из ПРАВОЙ панели ОТКРЫТЫ`);
  });
  it(`Проверка раздела "Аналоги" из левой панели Байкала.`, function () {
    allureReporter.generateReport();
    expect(
      baikalLeftPanelBetaComparables.$offers_short_list_root.isDisplayed(),
      `При открытии раздела "Карта" раздел "Аналоги" из левой панели НЕ должен быть открытым.`
    ).to.be.false;
    makeScreenshot(`Аналоги из ЛЕВОЙ панели ЗАКРЫТЫ`);

    baikalLeftPanelBetaComparables.goToSectionFromLeftMenu(BaikalEnumLeftPanelButtons.COMPARABLES);
    baikalLeftPanelBetaComparables.waitForLoad();
    expect(
      baikalLeftPanelBetaComparables.$offers_short_list_root.isDisplayed(),
      `После клика по разделу "Аналоги" из левой панели Байкала раздел "Аналоги" должен открыться, но
      этого не произошло`
    ).to.be.true;
    makeScreenshot(`Аналоги из ЛЕВОЙ панели ОТКРЫТЫ`);
  });
});
