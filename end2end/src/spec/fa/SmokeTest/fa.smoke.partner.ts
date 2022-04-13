import { partnerOcenka, partnerUserCabinet } from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`Смок тест по Партнерке`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
    issueId: "WEB-12481",
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();

    partnerOcenka.open();
    partnerOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    makeScreenshot(`SMOKE_Партнерка`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    partnerOcenka.$button_userCabinet.click();
    partnerOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    partnerOcenka.$input_login.setValue(TestDataFa.Users.login.ruslan);
    partnerOcenka.$button_send.click();
    partnerOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    partnerOcenka.$input_password.setValue(TestDataFa.Users.password.ruslan);
    partnerOcenka.$button_send.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    partnerUserCabinet.waitForLoad();

    let tableContentCheck = partnerUserCabinet.$OrderList_tableContent;
    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_Партнерка_КабинетЮзера");
  });
});
