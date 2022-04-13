import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";

import { TestDataBaikal } from "options/testData/baikal";
import { kronaLoginPage } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";

import {
  baikalAuth,
  baikalDemoBeta,
  BaikalEnumDemoModeHousingType,
  baikalHeaderBeta,
} from "pages/baikal/index";

import { expect } from "chai";
import { makeScreenshot } from "modules/screenshotsMaker";

let testName: string = `Байкал. Логаут из Байкала через кнопку в header-e`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `BL-726`,
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
  it(`Заполнить критерии поиска и перейти на карту Байкала`, function () {
    allureReporter.generateReport({
      description: `В демо режиме Байкала ввести адрес, выбрать тип недвижимости и после этого перейти к поиску аналогов`,
    });
    baikalDemoBeta.search_for_realty(
      TestDataBaikal.Residential.address.address_without_houseNumber,
      BaikalEnumDemoModeHousingType.FLAT
    );
  });
  it(`Логаут из Байкала`, function () {
    allureReporter.generateReport({
      description: `Нажатие кнопки логаута из Байкала на header'e`,
    });
    baikalHeaderBeta.logout();
    baikalAuth.waitForLoad();
    expect(
      baikalAuth.$input_login.isDisplayed(),
      `После логаута из Байкала должна была появиться Байкальская форма авторизации, но этого не произошло.
      Поле для ввода логина отсутствует на экране`
    ).to.be.true;
    expect(
      baikalAuth.$input_password.isDisplayed(),
      `После логаута из Байкала должна была появиться Байкальская форма авторизации, но этого не произошло.
      Поле для ввода пароля отсутствует на экране`
    ).to.be.true;
    makeScreenshot(`1`);
  });
});
