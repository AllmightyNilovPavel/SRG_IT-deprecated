import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";

import { kronaLoginPage } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";

import { baikalDemoBeta } from "pages/baikal/index";

import { expect } from "chai";
import { makeScreenshot } from "modules/screenshotsMaker";

let testName: string = `Байкал. Авторизация по прямой ссылке. Невалидные данные. Негативный кейс.`;

describe(testName, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBaikal,
    product: AllureReporterProducts.BAIKAL,
    story: this.title,
    issueId: "BL-783",
  });
  it(`Проверка, что при авторизации невалидными данными вход будет неудачным`, function () {
    browser.maximizeWindow();
    allureReporter.generateReport({
      description: `Тут мы пытаемся залогиниться с невалидными данными.
      Логин:${TestDataKrona.Users.login.srg.autotest_invalid_auth}
      Пароль:${TestDataKrona.Users.password.srg.autotest_invalid_auth}`,
    });
    baikalDemoBeta.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.autotest_invalid_auth,
      TestDataKrona.Users.password.srg.autotest_invalid_auth
    );
    expect(
      kronaLoginPage.$invalid_name_and_password.isDisplayed(),
      `После ввода невалидных данных на экране должно было появиться сообщение "Неверное имя пользователя или пароль"`
    ).to.be.true;
    expect(
      browser.getUrl(),
      `URL страницы должен остаться /login, так как мы не должны залогиниться в Байкал по невалидным данным`
    ).to.include(kronaLoginPage.path);
    makeScreenshot(`1`);
  });
});
