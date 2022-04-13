import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";

import { zalogOcenka, zalogUserCabinet } from "pages/fa";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe.only(`FA. SMOKE. ВТБ. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    zalogOcenka.open();
    zalogOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    makeScreenshot(`SMOKE_ЗалогОценка`);
    expect(zalogOcenka.$button_userCabinet.isClickable()).to.be.true;
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    console.log('Нажимаем кнопку "Личный кабинет"');
    zalogOcenka.$button_userCabinet.click();
    zalogOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    expect(zalogOcenka.$input_login.isClickable()).to.be.true;
  });
  it(`Ввод данных`, function () {
    allureReporter.generateReport();
    console.log("Вводим номер телефона");
    expect(zalogOcenka.$input_login.isClickable()).to.be.true;
    zalogOcenka.$input_login.click();
    zalogOcenka.$input_login.clearValue();
    zalogOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    console.log('Нажимаем "отправить"');
    expect(zalogOcenka.$button_send.isClickable()).to.be.true;
    zalogOcenka.$button_send.click();
    console.log("Ждём появления поля ввода пароля");
    zalogOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    console.log("Вводим пароль");
    expect(zalogOcenka.$input_password.isClickable()).to.be.true;
    zalogOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    expect(zalogOcenka.$button_send.isClickable()).to.be.true;
    zalogOcenka.$button_send.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    zalogUserCabinet.waitForLoad();
    zalogUserCabinet.$loader.waitForDisplayed({ timeout: 30000, reverse: true });
    makeScreenshot("SMOKE_ЗалогОценка_КабинетЮзера");
  });
});
