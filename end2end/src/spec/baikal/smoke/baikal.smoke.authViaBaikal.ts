import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";

import { TestDataKrona } from "options/testData/krona";
import { kronaLoginPage } from "pages/Krona";
import { baikalAuth, baikalHeaderBeta } from "pages/baikal/index";
import { baikalDemoBeta } from "pages/baikal/beta/index";
import { TestDataBaikal } from "options/testData/baikal";
import { expect } from "chai";
import { makeScreenshot } from "modules/screenshotsMaker";

let testName: string = `Байкал. Авторизация в Байкал через Байкальскую форму авторизации.`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: `BL-786`,
  });
  it(`Авторизоваться в Байкал-демо (вызывается форма авторизации из Кроны) с валидными данными`, function () {
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
  it(`Логаут из Байкала`, function () {
    allureReporter.generateReport({
      description: `Нажатие кнопки логаута на header'e`,
    });
    baikalHeaderBeta.logout();
    baikalAuth.waitForLoad();
  });
  it(`Авторизоваться в Байкал через Байкальскую форму авторизации под валидными данными`, function () {
    allureReporter.generateReport({
      description: `Данные для авторизации. \n
      Логин:${TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst}
      Пароль:${TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst}`,
    });
    baikalAuth.loginInBeta(
      TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst,
      TestDataKrona.Users.password.srg.autotest_baikal_junior_analyst
    );
    baikalDemoBeta.waitForLoad(TestDataKrona.Users.login.srg.autotest_baikal_junior_analyst);
    expect(
      baikalDemoBeta.$address_field.isDisplayed(),
      `После успешной авторизации автотест должен был вернуться в demo режим, но этого не произошло.
      Поле для ввода адреса отсутствует на экране`
    ).to.be.true;
    expect(
      baikalDemoBeta.$select_type_field.isDisplayed(),
      `После успешной авторизации автотест должен был вернуться в demo режим, но этого не произошло.
      Поле для выбора типа недвижимости отсутствует на экране`
    ).to.be.true;
    makeScreenshot(`1`);
  });
});
