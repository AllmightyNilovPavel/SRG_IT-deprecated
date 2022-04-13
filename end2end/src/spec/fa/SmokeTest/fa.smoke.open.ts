import { openOcenka, openUserCabinet } from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";
//import { openOcenkaMainPageForm } from "pages/fa/open/open.mainPageForm";
//import { FA_CreditAmount } from "pages/fa/enum";

describe(`FA. SMOKE. Открытие. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    openOcenka.open();
    openOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    //expect(openOcenka.$siteBodyIdentifier).to.be.equal("open");
    makeScreenshot(`SMOKE_Открытие`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    openOcenka.$button_appraisal.click();
    openOcenka.$button_userCabinet.click();
    openOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    openOcenka.$input_login.click();
    openOcenka.$input_login.clearValue();
    openOcenka.$input_login.setValue(TestDataFa.Users.login.roman);
    openOcenka.$button_send.click();
    openOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    openOcenka.$input_password.setValue(TestDataFa.Users.password.roman);
    openOcenka.$button_send.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    openUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = openUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_Открытие_КабинетЮзера");
  });
});
