import { smpOcenka, smpUserCabinet } from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. SMOKE. СМП-оценка. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    smpOcenka.open();
    smpOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    makeScreenshot(`SMOKE_СмпОценка`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    console.log('Нажимаем кнопку "Личный кабинет"');
    smpOcenka.$button_userCabinet.click();
    smpOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    console.log("Вводим номер телефона");
    smpOcenka.$input_login.click();
    smpOcenka.$input_login.clearValue();
    smpOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    // smpOcenka.input_login(options.FA.login1);
    console.log('Нажимаем "отправить"');
    smpOcenka.$button_send.click();
    console.log("Ждём появления поля ввода пароля");
    smpOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    smpOcenka.$input_password.click();
    console.log("Вводим пароль");
    smpOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    smpOcenka.$button_send.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    smpUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = smpUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_СмпОценка_КабинетЮзера");
  });
});
