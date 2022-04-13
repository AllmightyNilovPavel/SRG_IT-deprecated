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
  baikalLeftPanelBetaFilter,
  baikalMapBeta,
  baikalRightPanelBetaSearch,
} from "pages/baikal/beta/index";
import {
  BaikalEnumDemoModeHousingType,
  BaikalEnumLeftPanelButtons,
  BaikalEnumRightPanelButtons,
} from "pages/baikal/enums";
import { expect } from "chai";
import { makeScreenshot } from "modules/screenshotsMaker";

let testName: string = `Байкал. Открытие раздела "Фильтр" из левой панели Байкала`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `BL-840`,
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
  it(`Проверить, что при нажатии на раздел "Фильтр" из левой панели Байкала - раздел "Фильтр" откроется`, function () {
    allureReporter.generateReport();
    baikalLeftPanelBetaFilter.waitForLoad();
    expect(
      baikalLeftPanelBetaFilter.$filter_content.isDisplayed(),
      `При открытии раздела "Карта" раздел "Фильтр" из левой панели должен быть открытым.`
    ).to.be.true;
    makeScreenshot(`1`);
    baikalLeftPanelBetaFilter.goToSectionFromLeftMenu(BaikalEnumLeftPanelButtons.FILTER);
    expect(
      baikalLeftPanelBetaFilter.$filter_content.isDisplayed(),
      `После клика по разделу "Фильтр" он должен был закрыться.`
    ).to.be.false;
    makeScreenshot(`2`);
    baikalLeftPanelBetaFilter.goToSectionFromLeftMenu(BaikalEnumLeftPanelButtons.FILTER);
    baikalLeftPanelBetaFilter.waitForLoad();
    expect(
      baikalLeftPanelBetaFilter.$filter_content.isDisplayed(),
      `После клика по разделу "Фильтр" из левой панели Байкала раздел "Фильтр" должен открыться, но
      этого не произошло`
    ).to.be.true;
    makeScreenshot(`3`);
  });
});
