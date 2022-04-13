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
  baikalRightPanelBetaOfferFull,
} from "pages/baikal/beta/index";
import { BaikalEnumDemoModeHousingType, BaikalEnumRightPanelButtons } from "pages/baikal/enums";
import { expect } from "chai";
import { makeScreenshot } from "modules/screenshotsMaker";

let testName: string = `Байкал. Открытие раздела "Объект оценки" из правой панели Байкала`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `BL-838`,
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
  it(`Проверить, что при нажатии на раздел "Объект оценки" из правой панели Байкала - раздел "Объект оценки" откроется`, function () {
    allureReporter.generateReport();
    expect(
      baikalRightPanelBetaOfferFull.$offer_full_root.isDisplayed(),
      `При открытии раздела "Карта" раздел "Объект оценки" из правой панели НЕ должен быть открытым.`
    ).to.be.false;
    makeScreenshot(`1`);
    baikalRightPanelBetaOfferFull.goToSectionFromRightMenu(BaikalEnumRightPanelButtons.OFFER_FULL);
    baikalRightPanelBetaOfferFull.waitForLoad();
    expect(
      baikalRightPanelBetaOfferFull.$offer_full_root.isDisplayed(),
      `После клика по разделу "Объект оценки" из правой панели Байкала раздел "Объект оценки" должен открыться,
      но этого не произошло`
    ).to.be.true;
    makeScreenshot(`2`);
  });
});
