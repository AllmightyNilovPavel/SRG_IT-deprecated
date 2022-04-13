import { bspbOcenka, bspbUserCabinet } from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. SMOKE. БСПБ. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();

    bspbOcenka.open();
    bspbOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    makeScreenshot(`SMOKE_БСПБ`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    bspbOcenka.$buttonCreditOrderLink.waitForClickable();
    bspbOcenka.$buttonCreditOrderLink.click();
    bspbOcenka.$button_userCabinet.waitForClickable();
    bspbOcenka.$button_userCabinet.click();
    bspbOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    bspbOcenka.$input_login.click();
    bspbOcenka.$input_login.clearValue();
    bspbOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    // bspbOcenka.$button_send.click();
    bspbOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    bspbOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    bspbOcenka.$button_send.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    bspbUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = bspbUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_БСПБ_КабинетЮзера");
  });
});
