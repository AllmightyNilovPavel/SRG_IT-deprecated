import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { abrOcenka, abrUserCabinet, makeScreenshot } from "pages/fa";
import { TestDataFa } from "options/testData/fa";

describe(`FA. SMOKE. АБР. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    abrOcenka.open();
    makeScreenshot(`SMOKE_АБР`);
  });
  it(`Зайти в кабинет(страница авторизации)`, function () {
    allureReporter.generateReport();
    abrOcenka.$button_Realty.click();
    abrOcenka.$button_userCabinet.click();
    abrOcenka.$input_login.waitForDisplayed({ timeout: 5000, reverse: false });
    abrOcenka.$input_login.click();
    abrOcenka.$input_login.clearValue();
    abrOcenka.$input_login.setValue(TestDataFa.Users.login.roman);
    abrOcenka.$input_password.waitForDisplayed({ timeout: 5000, reverse: false });
    abrOcenka.$input_password.click();
    abrOcenka.$input_password.setValue(TestDataFa.Users.password.roman);
    abrOcenka.$button_auth.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    abrUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = abrUserCabinet.$OrderList_tableContent;
    expect(tableContentCheck).to.be.not.empty;
    // abrUserCabinet.$table_block.waitForDisplayed({timeout: 10000, reverse: false});
    makeScreenshot("SMOKE_АБР_КабинетЮзера");
  });
});
