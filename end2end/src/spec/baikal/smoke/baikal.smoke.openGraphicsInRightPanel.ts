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
  baikalRightPanelBetaGraphics,
} from "pages/baikal/beta/index";
import { BaikalEnumDemoModeHousingType, BaikalEnumRightPanelButtons } from "pages/baikal/enums";
import { expect } from "chai";
import { makeScreenshot } from "modules/screenshotsMaker";

let testName: string = `Байкал. Открытие раздела "Графики" из правой панели Байкала`;

// Графики пока что решили выключить совсем
describe.skip(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `BL-832`,
  });
  it(`Авторизоваться в Байкал-демо`, function () {
    browser.maximizeWindow();
    allureReporter.generateReport({
      description: `Данные для авторизации.
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
  it(`Проверить, что при нажатии на раздел "Графики" из правой панели Байкала - раздел "Графики" откроется`, function () {
    allureReporter.generateReport();
    expect(
      baikalRightPanelBetaGraphics.$graphics_root.isDisplayed(),
      `При открытии раздела "Карта" раздел "Графики" из правой панели НЕ должен быть открытым.`
    ).to.be.false;
    makeScreenshot(`1`);
    baikalRightPanelBetaGraphics.goToSectionFromRightMenu(BaikalEnumRightPanelButtons.GRAPHICS);
    baikalRightPanelBetaGraphics.waitForLoad();
    expect(
      baikalRightPanelBetaGraphics.$graphics_root.isDisplayed(),
      `После клика по разделу "Графики" из правой панели Байкала раздел "Графики" должен открыться, но
      этого не произошло`
    ).to.be.true;
    makeScreenshot(`2`);
  });
});
