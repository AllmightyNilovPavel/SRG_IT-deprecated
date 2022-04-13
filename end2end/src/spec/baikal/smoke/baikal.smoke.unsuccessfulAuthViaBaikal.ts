import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";

import { TestDataBaikal } from "options/testData/baikal";
import { TestDataKrona } from "options/testData/krona";
import { kronaLoginPage } from "pages/Krona";

import { baikalAuth, baikalDemoBeta, baikalHeaderBeta } from "pages/baikal/index";

import { expect } from "chai";
import { makeScreenshot } from "modules/screenshotsMaker";

let testName: string = `Байкал. Логаут из Байкала через кнопку в header-e`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: "BL-726",
  });
  it(`Авторизоваться в Байкал-демо`, function () {
    browser.maximizeWindow();
    allureReporter.generateReport({
      description: `Авторизация в Байкал под валидными данными (через КРОНовскую форму авторизации).
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
      description: `Нажатие кнопки логаута из Байкала в header'e`,
    });
    baikalHeaderBeta.logout();
    baikalAuth.waitForLoad();
  });
  it(`Попытка авторизации в Байкал под НЕ валидными данными через Байкальскую форму`, function () {
    allureReporter.generateReport({
      description: `Попытка авторизации в Байкал под НЕ валидными данными через Байкальскую форму авторизации.
      Логин:${TestDataBaikal.Users.login.srg.autotest_baikal_invalid_auth}
      Пароль:${TestDataBaikal.Users.password.srg.autotest_baikal_invalid_auth}`,
    });
    baikalAuth.$input_login.waitForClickable({
      timeoutMsg: `При входе в Байкал beta поле для ввода логина не кликабельно.`,
    });
    baikalAuth.$input_login.setValue(TestDataBaikal.Users.login.srg.autotest_baikal_invalid_auth);
    baikalAuth.$input_password.setValue(
      TestDataBaikal.Users.password.srg.autotest_baikal_invalid_auth
    );
    baikalAuth.$login_button.scrollIntoView();
    baikalAuth.$login_button.waitForClickable({
      timeoutMsg: `При входе в Байкал beta кнопка 'Войти' не кликабельна.`,
    });
    baikalAuth.$login_button.click();
    baikalAuth.waitForLoad();
    expect(
      baikalAuth.$unsuccessful_message.isDisplayed(),
      `Авторизация НЕ должна быть успешной, т.к. введены не валидные данные, но сообщение с ошибкой НЕ отображается на экране`
    ).to.be.true;
    makeScreenshot(`1`);
  });
});
