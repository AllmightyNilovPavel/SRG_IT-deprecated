import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { alfaOcenka, alfaUserCabinet } from "pages/fa";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. SMOKE. Альфабанк. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    alfaOcenka.open();
    alfaOcenka.waitForLoad();
    // alfaOcenka.$header_title.waitForDisplayed({timeout: 5000, reverse: false});
    makeScreenshot(`SMOKE_Альфа`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    alfaOcenka.$button_userCabinet.click();
    alfaOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    alfaOcenka.$input_login.click();
    alfaOcenka.$input_login.clearValue();
    alfaOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    alfaOcenka.$button_send.click();
    alfaOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    alfaOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    alfaOcenka.$button_send.click();
    // browser.pause(1000);
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    alfaUserCabinet.waitForLoad();
    let tableContentCheck = alfaUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    // alfaUserCabinet.$table_block.waitForDisplayed({timeout: 10000, reverse: false});
    makeScreenshot("SMOKE_Альфа_ЛК");
  });
});
